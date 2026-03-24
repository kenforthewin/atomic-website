---
title: Tags
description: Hierarchical tags organize your knowledge base and scope wiki generation and chat.
---

Tags form a hierarchical tree that organizes your atoms. They serve as both organizational structure and scoping mechanism.

## Hierarchy

Auto-extracted tags are organized under category parents:

- **Topics** — Subject matter (e.g., Topics/Machine Learning, Topics/Rust)
- **People** — Named individuals mentioned in your notes
- **Locations** — Places referenced in your content
- **Organizations** — Companies, institutions, groups
- **Events** — Named events, conferences, incidents

## Auto-Tagging

When you create an atom, Atomic's LLM pipeline analyzes the content and extracts relevant tags using structured outputs. Tags are placed in the appropriate category automatically.

## Manual Tags

You can also assign tags manually in the editor. Manual tags coexist with auto-extracted ones.

## Tags as Scope

Tags are more than labels — they define scope for other features:

- **Wiki articles** synthesize all atoms under a given tag
- **Chat conversations** can be scoped to specific tags
- **Canvas views** can filter by tag to focus on a subtopic
