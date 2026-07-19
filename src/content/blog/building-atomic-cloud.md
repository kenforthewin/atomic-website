---
title: Building Atomic Cloud
description: Database-per-tenant Postgres, subdomains as the tenant key, managed AI keys, and a launch week that taught me three different ways to be invisibly broken.
date: 2026-07-13
author: Kenny
draft: true
---

[Atomic Cloud](https://atomicapp.ai/cloud) is live. You pick a subdomain, you get a hosted Atomic — the pipeline, the wiki synthesis, the reports, the agentic chat — with AI included and nothing to configure. First commit was June 10. Open signup was July 11.

Atomic itself is an open-source, local-first app: a Tauri desktop shell around a Rust core, SQLite on your disk, your own AI keys. That version isn't going anywhere, and building the cloud without compromising it was the constraint that made this project interesting. So before writing any cloud code, I wrote down a rule:

> `grep -ri cloud crates/atomic-core crates/atomic-server` must return nothing.

Everything cloud-specific lives in one new crate, `atomic-cloud`, and the dependency arrow points one way: `atomic-cloud → atomic-server → atomic-core`. No feature flags, no `#[cfg(cloud)]`, no "if hosted" branches. The open-source app doesn't know the cloud exists. A month later the rule still holds, and most of the design decisions below fell out of trying not to break it.

## One Postgres database per tenant

The first version of this plan, months ago, was SQLite-per-customer on mounted volumes. It was solving the wrong constraint. Cloud users are, by definition, trading some privacy for ease of access — and once you accept that, the natural storage engine is the Postgres backend Atomic already had. The core's storage layer is a trait, and a Postgres implementation (pgvector instead of sqlite-vec, sqlx instead of rusqlite) already existed for shared-infrastructure setups. Self-hosted stays SQLite. Cloud is purely Postgres. Same `atomic-core`, two deployment shapes; this is where the trait abstraction earned back every hour it cost.

So the storage layer was mostly done on day one. The actual project was everything above it: accounts, auth, tenant routing, provisioning, background-work fairness, billing, backups.

Each account gets its own Postgres *database* — `acct_<uuid>` on a shared cluster — rather than a shared schema with a tenant column. That choice costs real things (N× system catalogs, N× autovacuum bookkeeping) and buys things I valued more:

- **Blast radius.** A bug in my SQL can corrupt one tenant, not a column's worth of everybody.
- **Backup and restore are per-tenant.** `pg_dump` one account, restore one account, without touching anyone else.
- **Sharding is mechanical.** The `account_databases` table has carried a `cluster_id` column since day one. When one cluster isn't enough, moving a tenant is a dump and a restore, not surgery.

One wrinkle worth naming: Atomic already had a concept of multiple knowledge bases per install, scoped by a `db_id` column. That concept survives *inside* each tenant database. The Postgres database is the administrative boundary; `db_id` is the user's organizational tool. Conflating those two tiers of "database" was the easiest early mistake to make, so the plan document has a section titled exactly that.

## The Host header is the tenant key

Every account's subdomain doubles as its routing input. The auth middleware reads `Host` before anything else: host → account → credential. This one primitive collapsed a surprising number of open questions — MCP endpoints, OAuth issuer URLs, cookie scoping — and it hands you cross-tenant isolation the browser already enforces. Cookies, localStorage, and CORS are all bound to origin, so `kenny.atomicapp.ai` and `alice.atomicapp.ai` are different security worlds without me writing a line of code.

The test that pins this is my favorite in the codebase: credentials for account A, presented on account B's subdomain, must fail. The session cookie technically crosses subdomains, so that test is the whole tenant-isolation story in one assertion.

And it's one process. Not a container per customer, not a process per tenant — one pod serving every account. The middleware resolves the tenant, an account cache hands back the tenant's handle (a small connection pool, an event channel), and the handle is dropped into the request's extensions. Then `atomic-server`'s existing handlers — all ~78 routes of them — pull the database handle out of the request without knowing who put it there. That was the trick that satisfied the grep rule: `atomic-server` needed exactly three refactors, and each one is defensible as a pure generality improvement with no cloud in sight. Route registration became a library function (so another binary can compose the same routes with different middleware). Database resolution moved into a request extension. So did the event channel. Cloud-driven, cloud-unaware.

The routes that *couldn't* be made per-tenant this way — the export jobs, the log endpoint, the server's own auth family, anything binding process-global state — didn't get wrapped. They got unrouted: a fail-closed guard 404s the whole family in the cloud composition until each one earns a per-tenant story. Remember this; it comes back in launch week.

Auth, by the way, is magic links only. No passwords, no password resets, no password table to breach. Email verification falls out of signup for free, because clicking the link is the proof.

## Nobody's first five minutes should involve an API key

The original billing plan was BYOK: bring your own OpenRouter key, I host the software, margins stay safe. I killed it a week before implementation started, because it fails the only test that matters for a first session: sign up, drop some notes in, and watch the graph organize itself. If step two is "now go create an API key on a different company's website," there is no magic moment.

So managed keys became the default. At provisioning time, the control plane creates a per-tenant OpenRouter key with a hard credit limit and a native monthly reset. Spend enforcement is delegated to the provider — my internal usage counters are advisory UX, never the thing that decides. BYOK survives as the opt-in escape hatch for people who want their own account and model list.

Managed mode means I curate the models, which turned out to be a sharper responsibility than "pick good ones":

- **The embedding model is pinned fleet-wide.** Changing embedding models means re-embedding everything you own; on the managed tier that's a config change you cannot make by accident. Even BYOK rejects dimension changes outright, because a warning you can't act on is worse than a refusal.
- **Every curated model must be served by more than one upstream.** This rule didn't exist at launch. It exists now, for a reason described two sections down.

## Background work defers; it never fails for being poor

Every note you save kicks off a pipeline: chunk, embed, auto-tag, wire semantic edges into the graph. Self-hosted, that's a background task on your own machine. Multi-tenant, it's a fairness problem — one person's 10,000-atom Obsidian import must not starve everyone else's two-line note.

The dispatcher is per-pod with no leader election; work claims ride `FOR UPDATE SKIP LOCKED` on a ledger, so any number of pods can pull safely. Fairness is round-robin across tenants, feeding four worker pools split by work class (embedding, LLM, ingestion, maintenance), each with total and per-tenant in-flight caps. To avoid polling every tenant every tick, mutations set a dispatch hint — the fast path ticks every couple of seconds but looks only at hinted tenants, while a slow full scan sweeps everyone every fifteen minutes as the recovery bound for lost hints and the driver for purely time-based work like feed polls.

The design decision I'd defend hardest: environmental failures defer instead of failing. If your background work hits a rate limit or your credits run out at 3 a.m., the work sits in the ledger, and fixing the underlying condition re-arms it immediately. Your notes don't permanently fail to embed because a quota was briefly true. Failure is reserved for things that are actually wrong.

## A deploy isn't done until every tenant's schema is

Database-per-tenant means schema migrations are a fleet operation. Every deploy boots in migrating mode and walks lagging tenant databases before the readiness check flips; a tenant caught mid-migration gets a structured 503 and a retry from the reaper rather than undefined behavior.

Two policies keep that from being terrifying. Migrations are additive-only — no drops, no type changes, no renames, enforced by a CI lint over the migration directory, with destructive cleanup happening N+1 deploys after the referring code is gone. And every tenant database carries a version stamp, so a deploy that doesn't raise the schema target short-circuits to a single control-plane query instead of connecting to N databases to learn there's nothing to do.

## Read-only is a serving state, not a hostage state

The billing rules were written down before the billing code, because these are the decisions you don't want to improvise during an incident:

- **Non-payment never deletes data.** Three days past due, the account goes read-only. Fourteen, it's suspended. The data stays, indefinitely, until the user themselves deletes it.
- **Read-only means readable, and exportable.** The full markdown export keeps working while you're delinquent. Starting an export is technically a POST, so it's explicitly exempted from the write block — the moment someone is lapsed or leaving is exactly the moment egress must work.
- **No drop without a dump.** Account deletion takes a final backup first, and a failed backup aborts the deletion. The delete path is typed so that skipping the backup is a compile error, never a silent fail-open.

## Launch week: three ways to be invisibly broken

Launch day went well. Stripe was exercised end-to-end by real purchases within hours, which found two bugs no test had (an API version had moved billing-period fields onto invoice line items; checkout return URLs pointed at the app host, where the account dashboard doesn't exist). Both fixed same day. That part I expected.

What I didn't expect was the theme of the following week: three separate faults, none of which announced themselves.

**The embeddings got slow.** Cloud embeddings suddenly took 13 to 80 seconds against a model that normally answers in half a second. Nothing was down, nothing errored — OpenRouter's default price-sorted routing had simply started landing requests on a pathological upstream, because same-priced upstreams can differ 100× in latency and price-sorting is indifferent between them. The fix is one field, `provider: {sort: "latency"}`, which self-heals around sick upstreams without pinning any by name. It also produced the curation rule from earlier: a model served by only one upstream has no routing escape hatch, so multi-upstream serving is now a hard requirement for the managed list — the best open-weight candidate on paper was rejected on exactly this.

**The export was missing.** Remember the fail-closed guard that 404s process-global route families? The export jobs were behind it, flagged "needs a per-tenant story, later slice." Launch made that a broken promise, since always-exportable was on the pricing page. The story got built properly — an export-job manager per account, artifacts in per-account directories, job IDs that resolve only inside the requesting account's namespace so foreign IDs 404 by construction — and the dunning exemption from the previous section went in the same day. Fail-closed was the right default; the miss was not tracking what the closure still owed.

**The backups were dead.** The nightly backup loop picked a random jitter within its 24-hour interval on startup — and launch week meant deploying several times a day, so the timer rerolled before ever firing. The staleness watchdog lived in the same loop, so it never fired either. Nothing crashed, nothing logged an error; there simply were no new backup dates, and a human noticed 34 hours in. The redesign inverted the scheduling: the loop now ticks every five minutes and dumps whichever tenants are past their cadence, so a restart costs at most one tick. The rule I extracted, and the one sentence I'd carry to any other system: **never gate periodic work — or its watchdog — behind a timer a process restart resets.**

Three faults, one meta-lesson: every one was invisible until a person went looking. So the last block of work was making the system announce itself. The pod now exports a couple dozen metric families on an internal-only listener, shipped to a hosted Grafana alongside Postgres and host metrics, with alerts keyed to each known failure mode. The pattern I settled on for loop liveness is worth stealing: don't export a boolean, export the timestamp of the last success and alert on its age, initialized to infinity. A dead loop then reads as unbounded age from the first scrape. It can never read as frozen-healthy, which is precisely what the backup loop's watchdog did.

## Find the shape before the shape finds you

Atomic Cloud runs on one box. I think single-box honesty beats premature distribution, but honesty is the operative word, so the launch-week epilogue was a scaling document: every way the single-droplet topology bends as tenants grow. The connection budget (a 200-connection cluster serving 5-connection tenant pools supports roughly 35 tenants running full-tilt at once). The cross-tenant scan whose cost grows linearly with accounts. The deploy-time migration wall. Disk overcommit, which is the only entry that ends in data loss instead of slowness.

Each concern gets four fields: the O(·) shape and where it lives in code, an honest order-of-magnitude for when it bites, the metric that announces it, and a remediation ladder from cheapest knob to structural fix. The discipline is refusing to build the structural fix speculatively — the document exists so that when a signal fires, the response was decided calmly months earlier.

## In closing

A month in, the grep still returns nothing. The self-hosted app compiled through this whole project without learning a thing, which I'm taking as evidence the boundary was drawn in the right place: not a fork, not a feature flag, just one crate that composes the open-source server inside its own middleware and keeps every tenant-shaped concern to itself.

[Atomic Cloud is open for signups](https://atomicapp.ai/cloud), and there's a free tier — try it out. And if this post left you wanting the version where you hold the keys: [that one's free forever](https://github.com/kenforthewin/atomic), and it has no idea any of this happened.
