---
title: Getting Started
description: Get up and running with Atomic — a personal knowledge base powered by semantic search and AI.
---

Atomic is a personal knowledge base that turns freeform markdown notes ("atoms") into a semantically-connected, AI-augmented knowledge graph.

## What is Atomic?

When you create or update a note in Atomic, an asynchronous pipeline automatically:

1. **Chunks** the content using markdown-aware boundaries
2. **Generates vector embeddings** via your configured AI provider
3. **Extracts and assigns tags** using LLM structured outputs
4. **Builds semantic edges** to related notes based on embedding similarity

This all happens in the background — you write notes normally, and your knowledge base organizes itself.

## Key Features

- **Semantic Search** — Find ideas by meaning, not just keywords
- **Wiki Synthesis** — LLM-generated articles with inline citations to your notes
- **Agentic Chat** — Converse with your knowledge base using RAG
- **Spatial Canvas** — Visualize your knowledge as a force-directed graph
- **Auto-Tagging** — Hierarchical tags extracted automatically
- **MCP Integration** — Connect to Claude and other AI assistants

## Choose Your Setup

Atomic runs in several configurations:

| Setup | Best For |
|-------|----------|
| [Desktop App](/getting-started/installation/) | Personal use, local-first |
| [Self-Hosted Server](/getting-started/self-hosting/) | Remote access, multi-device |
| [iOS App](/guides/ios-app/) | Mobile reading and writing |

## Next Steps

- [Install the desktop app](/getting-started/installation/)
- [Set up a self-hosted server](/getting-started/self-hosting/)
- [Configure AI providers](/getting-started/ai-providers/)
