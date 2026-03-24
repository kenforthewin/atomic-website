---
title: Atoms
description: Atoms are the fundamental unit of knowledge in Atomic — markdown notes with semantic superpowers.
---

**Atoms** are the fundamental unit of your knowledge base. Each atom is a markdown note that gets automatically processed by Atomic's AI pipeline.

## What is an Atom?

An atom consists of:

- **Content** — Markdown text (the note itself)
- **Title** — Derived from the content or set manually
- **Source URL** — Optional link to the original source
- **Tags** — Hierarchical labels, auto-extracted or manually assigned

## The Processing Pipeline

When you create or update an atom, Atomic runs an asynchronous pipeline:

1. **Chunking** — The content is split at markdown-aware boundaries (headers, paragraphs, code blocks) to create semantically coherent chunks
2. **Embedding** — Each chunk is sent to your AI provider to generate a vector embedding
3. **Tagging** — The full content is analyzed by an LLM to extract structured tags
4. **Edge Building** — Vector similarity is computed against all other chunks to find semantically related atoms

This pipeline is fire-and-forget — you get your saved atom immediately while processing happens in the background.

## Creating Atoms

You can create atoms in several ways:

- **Editor** — Write directly in Atomic's CodeMirror-based markdown editor
- **Web Clipper** — Use the browser extension to save web pages
- **API** — POST to `/api/atoms` with markdown content
- **Import** — Bulk import from Obsidian vaults, RSS feeds, or Wikipedia
