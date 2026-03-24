---
title: API Overview
description: Overview of the Atomic REST API — authentication, endpoints, and conventions.
---

Atomic server exposes a comprehensive REST API with ~78 endpoints across 16 categories.

## Base URL

```
http://localhost:8080/api
```

## Authentication

All endpoints require Bearer token authentication:

```
Authorization: Bearer <your-token>
```

See [Token Management](/self-hosting/token-management/) for creating and managing tokens.

## Endpoint Categories

| Category | Description |
|----------|-------------|
| Atoms | CRUD operations, bulk create, source listing |
| Tags | Tag management, hierarchy |
| Search | Semantic and hybrid search, find similar |
| Wiki | Generate, update, delete articles, versions |
| Chat | Conversations, messages, scope management |
| Canvas | Positions, atom data with embeddings |
| Graph | Semantic edges, neighborhood exploration |
| Clustering | Compute clusters, connection analysis |
| Embeddings | Process pending, retry failed, status |
| Settings | Provider config, model selection, connection testing |
| Providers | Test/verify providers, list Ollama models |
| Auth | Token CRUD |
| Databases | Multi-database management |
| Import | Obsidian vault import |
| Ingestion | URL ingestion |
| Feeds | RSS/Atom feed management |

## Interactive Explorer

For a full interactive reference with request/response examples, see the [API Explorer](/api/explorer).

## Response Format

All endpoints return JSON. Errors follow a consistent format:

```json
{
  "error": "Description of what went wrong"
}
```

## Pagination

List endpoints support pagination via query parameters:

```
GET /api/atoms?page=1&per_page=50
```
