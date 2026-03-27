---
title: MCP Server
description: Give your AI agents long-term memory by connecting them to Atomic via the Model Context Protocol.
---

Atomic exposes an MCP (Model Context Protocol) server that gives AI agents long-term memory. Agents can search, read, create, and update knowledge — and you can see, edit, and enrich everything they store.

## How It Works

The MCP endpoint is built into `atomic-server`. When an agent connects, it gets four tools:

| Tool | Description |
|------|-------------|
| `semantic_search` | Search memory for relevant knowledge using hybrid keyword + vector search |
| `read_atom` | Read the full content of a specific atom |
| `create_atom` | Store new knowledge as a markdown atom |
| `update_atom` | Revise an existing atom when information has changed |

The server uses [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) transport at the `/mcp` endpoint, with Bearer token authentication.

## Setup

### Prerequisites

You need `atomic-server` running. See [Self-Hosting](/getting-started/self-hosting/) or use the desktop app (which runs the server automatically).

You also need an API token. The server prints a default token on first run, or you can create one:

```bash
cargo run -p atomic-server -- token create --name "claude"
```

### Claude Code

Add to your Claude Code MCP settings (`.mcp.json` in your project root or `~/.claude/mcp.json` globally):

```json
{
  "mcpServers": {
    "atomic": {
      "type": "url",
      "url": "http://localhost:44380/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

### Claude Desktop

Claude Desktop supports Streamable HTTP MCP servers. Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "atomic": {
      "type": "url",
      "url": "http://localhost:44380/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

### Cursor

Add to your Cursor MCP settings (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "atomic": {
      "type": "url",
      "url": "http://localhost:44380/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

### Stdio Bridge

For MCP clients that only support stdio transport, Atomic includes a bridge binary (`atomic-mcp-bridge`) that translates between stdio and the server's HTTP endpoint:

```json
{
  "mcpServers": {
    "atomic": {
      "command": "path/to/atomic-mcp-bridge",
      "env": {
        "ATOMIC_HOST": "127.0.0.1",
        "ATOMIC_PORT": "44380"
      }
    }
  }
}
```

## Multi-Database Support

If you have multiple databases, specify which one to use with the `db` query parameter:

```
http://localhost:44380/mcp?db=DATABASE_ID
```

Without the parameter, the server uses the active (default) database.

## Tips for Getting Agents to Use Memory

The MCP server includes instructions that tell agents to search before answering and remember what's worth retaining. But you can reinforce this in your own prompts.

For **Claude Code**, add to your `CLAUDE.md`:

```markdown
You have access to Atomic, your long-term memory. Always search Atomic
before answering questions that might relate to past context. When you
learn something worth retaining — user preferences, project decisions,
important context — store it as an atom.
```

For **Claude Desktop** or **Cursor**, add similar guidance to your system prompt or project rules.

## The Feedback Loop

Memory works best as a collaboration:

1. **Your agents remember** — They store what they learn via MCP. Preferences, decisions, project context.
2. **You curate** — Browse what they've stored in the Atomic UI. Edit, organize, add your own knowledge.
3. **Everyone benefits** — Agents search before responding. You enrich what they find. One knowledge base, two contributors.
