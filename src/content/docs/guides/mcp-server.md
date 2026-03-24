---
title: MCP Server
description: Connect your knowledge base to Claude and other AI assistants via the Model Context Protocol.
---

Atomic includes MCP (Model Context Protocol) support, allowing AI assistants like Claude to search and interact with your knowledge base.

## Two MCP Modes

### Streamable HTTP (via atomic-server)

The standalone server exposes an MCP endpoint alongside the REST API. This is the simplest setup if you're already running `atomic-server`.

### Stdio (via atomic-mcp)

The `atomic-mcp` crate provides a standalone MCP server that communicates over stdio and connects directly to the database. This is useful for local setups where you don't need the full HTTP server.

## Available Tools

The MCP server exposes tools for:

- **Searching** your knowledge base semantically
- **Reading** atom content
- **Creating** new atoms

## Setup with Claude Desktop

Add to your Claude Desktop MCP configuration:

```json
{
  "mcpServers": {
    "atomic": {
      "command": "path/to/atomic-mcp",
      "args": ["--data-dir", "/path/to/databases"]
    }
  }
}
```
