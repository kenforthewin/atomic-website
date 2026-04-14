---
title: Reports of RAG's death have been greatly exaggerated
description: Andrej Karpathy posted a markdown directory and the timeline declared the vector database obsolete. A brief note on what the eulogy left out.
date: 2026-04-13
author: Kenny
draft: false
---

In early April, Andrej Karpathy [posted an "idea file"](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) describing how he'd been having an LLM maintain a personal wiki of markdown files instead of re-querying raw documents on every question. Sensible. Useful. The kind of small, well-observed workflow note Karpathy is unusually good at.

Sixteen million views later, the timeline rendered its verdict.

> "Karpathy shares 'LLM Knowledge Base' architecture that bypasses RAG with an evolving markdown library maintained by AI." — [VentureBeat](https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an)
>
> "Bye Bye RAG." — [Medium / Data Science in Your Pocket](https://medium.com/data-science-in-your-pocket/andrej-karpathys-llm-wiki-bye-bye-rag-ee27730251f7)
>
> "Karpathy Says RAG is Outdated: The Living Wiki is the Alternative." — [StrategyArena](https://strategyarena.io/en/blog/karpathy-rag-is-dead-living-wiki)
>
> "No vector databases, no RAG pipelines, just markdown files and an LLM that acts like a full-time librarian." — [Medium / Neural Notions](https://medium.com/neuralnotions/andrej-karpathy-stopped-using-ai-to-write-code-hes-using-it-to-build-a-second-brain-instead-cddceadc5df5)
>
> "RAG is Dead, Long Live the Agentic Wiki. The era of stateless retrieval is over." — [Epsilla](https://www.epsilla.com/blogs/karpathy-agentic-wiki-beyond-rag-enterprise-memory)

Derivative gists appeared. Entire build-it-yourself stacks were published within the week. The vector database, after a brief and well-funded run, was officially over.

I'd like to gently push back on the obituary.

## What he actually said

The valuable insight in the gist is real: **the wiki is a persistent, compounding artifact**. Most RAG pipelines treat knowledge as something to look up on demand — chunks in a vector store, retrieved per query, forgotten after. Each question pays the cost of rediscovery. A wiki is different. The summarization, the cross-references, the "what we believe and why" — that work happens once, gets written down, and accumulates.

LLMs, as Karpathy notes, are uniquely well-suited to maintain this kind of structure. They don't get bored. They will happily touch fifteen files to update one cross-reference. Bookkeeping is the job they were born for. None of this is in dispute.

What is, perhaps, in dispute is whether any of it requires us to retire vector embeddings.

## The footnote

Read the gist past the architecture diagrams and you find a number. Karpathy reports running this setup at roughly **100 articles and 400,000 words**.

A hundred wiki pages. At that size, the agent navigates by index and summary alone because the index *fits in context*. The model doesn't search; it reads the catalog. "Retrieval" is `ls`.

This is fine — at this scale. It is also, I'd argue, the entire reason the system works without an embedding index. The "bye bye RAG" framing the discourse extracted from the post quietly assumes that what works at 100 pages works at 10,000. It does not. Walking a directory with an agent is `O(n)` in the files the agent has to consider, and the context window is the only thing keeping that tractable. A thousand pages strains it. Ten thousand breaks it. At a hundred thousand notes — the size of an actually-used long-running knowledge base — agentic grep is brute-force retrieval in a slightly nicer outfit.

The scale caveat got lost somewhere between the original post and the third Medium tutorial.

## The wrong axis

It helps to notice that "wiki" and "vector index" aren't competing answers to the same question. They answer different ones.

- **The wiki** answers: *what do we know, and how does it connect?* It's the artifact — synthesized, cited, durable, human-readable, LLM-maintained.
- **The retrieval substrate** answers: *given a query, which pieces of the wiki and which raw sources are relevant right now?* It's the index — fast, recall-friendly, cheap at scale.

Karpathy's pattern collapses these because at his scale the substrate is trivial. `ls` is a perfectly good index for a hundred files. But the second your knowledge base outgrows what fits in context, you need a real substrate underneath the wiki, not as a replacement for it.

Vector embeddings remain the cheapest way to ask "what's relevant to this idea?" across an arbitrary-sized corpus, in milliseconds, without an LLM in the loop. That hasn't changed. It didn't change in April. It is not, I regret to report, going to change because a gist went viral.

## How Atomic handles it

[Atomic](https://github.com/kenforthewin/atomic) is built on the unfashionable premise that the wiki and the index belong in the same system. The pitch is short: **drop anything in — RSS feeds, articles, web clips, notes, Obsidian vaults, Wikipedia pages — and get a knowledge base out**. A pipeline does the work the wiki pattern asks of you; vectors are the substrate underneath it.

<figure>
  <img src="/images/screenshots/wiki.png" alt="Atomic wiki synthesis with inline citations" />
  <figcaption>A wiki article synthesized from every atom under a tag, with inline citations back to the source.</figcaption>
</figure>

Concretely:

- **Ingestion is open-ended.** RSS subscriptions, URL ingestion, a web clipper extension, bulk Obsidian import. Anything you point at it becomes an atom.
- **Auto-tagging slots each new atom into a hierarchical tag tree** using structured LLM outputs. Tags aren't decoration — they're scope. A wiki article, a chat, or a canvas view can be scoped to a tag and only see that subtree.
- **Async semantic edges** wire each atom into the graph as you write. Embeddings, neighbor links, cluster membership — all computed in the background. The graph organizes itself.
- **Wiki synthesis** generates a comprehensive article from every atom under a tag, with inline citations back to the source atoms. This is the Karpathy wiki pattern, scoped and on demand, with retrieval doing the heavy lifting so the whole corpus doesn't have to fit in context.
- **Agentic chat** runs against the knowledge base in real time. The agent searches semantically during the conversation and grounds its answers in actual atoms, not a frozen wiki snapshot.
- **Canvas** lays out the same graph spatially. Semantically related atoms cluster together, so you can see the shape of what you've captured.
- **Daily briefing** is the wiki idea applied to time: an AI-generated summary of everything you captured recently, with inline citations and a mini-canvas of source atoms. The compounding artifact, delivered every morning.

<figure>
  <img src="/images/screenshots/canvas.png" alt="Atomic canvas view showing semantically clustered atoms" />
  <figcaption>The canvas: semantically related atoms cluster spatially. The graph that powers retrieval, made visible.</figcaption>
</figure>

Wiki synthesis on top of vector retrieval. Persistent artifacts on top of an index that scales. Both halves of the system the discourse decided to split apart.

## In closing

"Do I still need a vector database?" is the wrong question to inherit from a viral post. The right one is: **what's my retrieval substrate when the wiki gets too big to fit in context?**

If your answer is "I'll let the agent grep," you have a wiki that works at 100 pages and falls over at 10,000. If your answer is "embeddings, and the wiki sits on top of them," you have a system that compounds the way Karpathy described — and keeps working as it grows.

RAG, it turns out, is doing fine. It just got a wiki on top of it. [That's what Atomic is.](https://github.com/kenforthewin/atomic)
