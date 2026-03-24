---
title: Chat
description: Agentic RAG — converse with your knowledge base using AI that searches your notes in real-time.
---

Chat is an agentic RAG (Retrieval-Augmented Generation) system that lets you have conversations grounded in your knowledge base.

## How It Works

The chat agent has tools to semantically search your knowledge base during conversation. When you ask a question:

1. The agent decides whether to search your notes
2. It formulates search queries and retrieves relevant chunks
3. It synthesizes an answer grounded in the retrieved content
4. Responses stream back in real-time

## Scoped Conversations

Conversations can be scoped to specific tags. When scoped, the agent only searches atoms under those tags, giving you focused answers about a particular topic.

## Conversations

Chat conversations are persisted — you can revisit previous conversations and continue where you left off. Each conversation tracks its messages and the tags it's scoped to.
