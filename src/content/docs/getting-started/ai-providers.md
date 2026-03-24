---
title: AI Providers
description: Configure OpenRouter or Ollama for embeddings, tagging, wiki synthesis, and chat.
---

Atomic's AI features require a configured provider. Two providers are supported:

## OpenRouter (Cloud)

[OpenRouter](https://openrouter.ai/) is the default provider and gives access to a wide range of models.

1. Create an account at openrouter.ai
2. Generate an API key
3. In Atomic, go to **Settings** and select **OpenRouter** as the provider
4. Paste your API key

OpenRouter uses separate model settings for:
- **Embedding** — generating vector embeddings for semantic search
- **Tagging** — extracting tags from note content
- **Wiki** — synthesizing wiki articles
- **Chat** — agentic RAG conversations

## Ollama (Local)

[Ollama](https://ollama.com/) runs models locally on your machine.

1. Install Ollama
2. Pull the models you want to use (e.g., `ollama pull nomic-embed-text`)
3. In Atomic, go to **Settings** and select **Ollama** as the provider
4. Atomic will auto-discover available models from the running Ollama server

:::tip
For best results with local models, use `nomic-embed-text` for embeddings and a capable chat model like `llama3` or `mistral` for other tasks.
:::
