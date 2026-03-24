---
title: Introducing Atomic
description: A personal knowledge base that turns freeform notes into a semantically-connected, AI-augmented knowledge graph.
date: 2024-03-24
author: Kenny
---

Atomic is a personal knowledge base built on a simple idea: your notes should understand each other.

When you write a note in Atomic, it doesn't just sit in a folder. An asynchronous pipeline chunks the content, generates vector embeddings, extracts tags, and builds semantic edges to related notes. Your knowledge base organizes itself as you write.

## What makes Atomic different?

Most note-taking apps are glorified file systems. You organize notes into folders, maybe add some tags, and hope you remember where things are. Atomic takes a different approach:

**Semantic search** means you find ideas by meaning, not keywords. Looking for that note about "how neural networks learn"? You'll find it even if you search for "backpropagation training process."

**Wiki synthesis** generates comprehensive articles from all your notes under a tag, with inline citations. It's like having a research assistant that reads everything you've written and produces a coherent summary.

**Agentic chat** lets you have conversations with your knowledge base. The AI searches your notes in real-time during the conversation, grounding every response in your actual content.

**Canvas visualization** turns your knowledge graph into a spatial map. Semantically related notes cluster together, giving you a bird's-eye view of how your ideas connect.

## Architecture

Atomic is built on a core principle: business logic should be completely separate from transport. All domain logic lives in `atomic-core`, a standalone Rust crate. Every client — the Tauri desktop app, the HTTP server, the MCP server — is a thin wrapper that adapts the core to a specific transport mechanism.

This means your knowledge base works the same way whether you're using the desktop app, connecting via the REST API from iOS, or querying through an MCP-enabled AI assistant.

## Open source, self-hostable

Atomic is fully open source and designed to be self-hosted. Your data stays on your hardware. Run it as a desktop app, a Docker container, or both.

Check out the [GitHub repo](https://github.com/kenforthewin/atomic) to get started.
