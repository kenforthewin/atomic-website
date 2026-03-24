---
title: Semantic Search
description: Search your knowledge base by meaning using vector embeddings.
---

Semantic search lets you find atoms by meaning rather than exact keyword matches.

## How It Works

1. Your query is converted to a vector embedding using the same model that embedded your atoms
2. The embedding is compared against all chunk embeddings using sqlite-vec
3. Results are ranked by cosine similarity and returned with relevance scores

## Search Modes

Atomic supports multiple search modes:

- **Semantic** — Pure vector similarity search
- **Hybrid** — Combines semantic search with full-text keyword matching for best results

## Similarity Scores

Similarity is computed from sqlite-vec's Euclidean distance on normalized vectors:

```
similarity = 1.0 - (distance² / 2.0)
```

Default thresholds:
- **0.5** — Related atoms and semantic edge creation
- **0.3** — Search results and wiki chunk selection
