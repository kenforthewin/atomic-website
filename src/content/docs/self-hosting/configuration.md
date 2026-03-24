---
title: Configuration
description: Server configuration options and settings.
---

## Command-Line Options

```bash
atomic-server [OPTIONS] <COMMAND>

Commands:
  serve    Start the HTTP server
  token    Manage API tokens
```

### Serve Options

| Flag | Default | Description |
|------|---------|-------------|
| `--port` | `8080` | Port to listen on |
| `--data-dir` | `.` | Directory for database files |

## Settings

Runtime settings are stored in the registry database and can be changed via the API or UI:

- **AI Provider** — OpenRouter or Ollama
- **Model Selection** — Separate models for embedding, tagging, wiki, and chat
- **API Keys** — Provider API keys

```bash
# Check current settings
sqlite3 databases/registry.db "SELECT key, value FROM settings;"
```
