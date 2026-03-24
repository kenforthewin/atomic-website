---
title: Wiki Synthesis
description: LLM-generated wiki articles that synthesize your notes with inline citations.
---

Wiki articles are AI-synthesized summaries of all atoms under a given tag, with inline citations linking back to source atoms.

## How It Works

1. All atoms tagged with the target tag are gathered
2. Their chunks are selected based on relevance (similarity threshold of 0.3)
3. The content is sent to the LLM with instructions to synthesize a coherent article
4. The LLM produces markdown with inline citation markers linking to source atoms

## Incremental Updates

Wiki articles support incremental updates. When new atoms are tagged:

1. Only the new content is sent to the LLM
2. The LLM integrates the new information into the existing article
3. New citations are added for the new sources

This means articles grow and evolve as your knowledge base expands, without regenerating from scratch each time.

## Citations

Every claim in a wiki article is backed by an inline citation. Citations link directly to the source atom, so you can always verify where information came from.
