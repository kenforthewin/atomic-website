---
title: Importing Data
description: Import notes from Obsidian, RSS feeds, and other sources.
---

Atomic supports importing data from several sources.

## Obsidian Vaults

Import your existing Obsidian vault into Atomic:

```bash
cargo run -p atomic-server -- import obsidian --vault-path /path/to/vault
```

This will:
- Convert each markdown file to an atom
- Preserve file metadata
- Trigger the embedding pipeline for all imported atoms

## RSS Feeds

Subscribe to RSS/Atom feeds and automatically ingest new articles:

```bash
# Add a feed
POST /api/feeds
{ "url": "https://example.com/feed.xml", "name": "Example Blog" }
```

Atomic will periodically check feeds and create atoms from new entries.

## URL Ingestion

Ingest individual web pages by URL:

```bash
POST /api/ingest
{ "url": "https://example.com/article" }
```

The page content is extracted, cleaned, and saved as an atom with the source URL attached.

## Wikipedia

Import Wikipedia articles for reference:

```bash
npm run import:wikipedia -- "Machine Learning" "Rust (programming language)"
```
