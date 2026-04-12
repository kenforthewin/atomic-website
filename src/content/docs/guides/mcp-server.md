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

## Desktop App (Local Mode)

The desktop app bundles `atomic-mcp-bridge`, a stdio-to-HTTP bridge that connects to the local server and handles authentication automatically. No token configuration needed.

Open **Settings > Integrations > MCP Integration** in the Atomic desktop app to see the exact configuration for your system. It will look like this:

### Claude Code

Add to `.mcp.json` in your project root or `~/.claude/mcp.json` globally:

```json
{
  "mcpServers": {
    "atomic": {
      "command": "/Applications/Atomic.app/Contents/MacOS/atomic-mcp-bridge"
    }
  }
}
```

### Claude Desktop

Add to your Claude Desktop config (`Settings > Developer > Edit Config`):

```json
{
  "mcpServers": {
    "atomic": {
      "command": "/Applications/Atomic.app/Contents/MacOS/atomic-mcp-bridge"
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "atomic": {
      "command": "/Applications/Atomic.app/Contents/MacOS/atomic-mcp-bridge"
    }
  }
}
```

:::note
The path above is the default macOS location. On Linux the path depends on how Atomic was installed. Check **Settings > Integrations** in the app for the exact path on your system.
:::

The bridge reads the auth token from the Atomic data directory automatically. You can override connection settings with environment variables if needed:

| Variable | Default | Description |
|----------|---------|-------------|
| `ATOMIC_TOKEN` | (auto-discovered) | Override the auth token |
| `ATOMIC_HOST` | `127.0.0.1` | Server host |
| `ATOMIC_PORT` | `44380` | Server port |

## Remote / Self-Hosted / Web

For remote servers or the web app, connect via the HTTP endpoint directly. You'll need an API token for authentication.

### Creating a Token

**From the UI:** Go to **Settings > Integrations > MCP Integration** and click **Create MCP Token**. The config with your token embedded will be shown — copy it immediately, as the token is only displayed once.

**From the CLI:**

```bash
atomic-server token create --name "claude"
```

### Claude Code

Add to `.mcp.json` in your project root or `~/.claude/mcp.json` globally:

```json
{
  "mcpServers": {
    "atomic": {
      "type": "url",
      "url": "https://your-server.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

### Claude Desktop

Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "atomic": {
      "type": "url",
      "url": "https://your-server.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "atomic": {
      "type": "url",
      "url": "https://your-server.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
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
