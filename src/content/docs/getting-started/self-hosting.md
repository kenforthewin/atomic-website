---
title: Self-Hosting
description: Run Atomic as a headless server for remote access and multi-device usage.
---

Atomic can run as a standalone HTTP server without the desktop UI. This is ideal for remote access, running on a VPS, or multi-device usage with the iOS app.

## Quick Start with Docker

```bash
docker run -d \
  --name atomic \
  -p 8080:8080 \
  -v atomic-data:/data \
  ghcr.io/kenforthewin/atomic-server:latest
```

The server will start on port 8080 with a data directory at `/data`.

## From Source

```bash
# Clone the repo
git clone https://github.com/kenforthewin/atomic.git
cd atomic

# Run the server
cargo run -p atomic-server -- serve --port 8080
```

## Authentication

The server uses Bearer token authentication. A default token is automatically created on first run and printed to stdout.

```bash
# Create a new token
cargo run -p atomic-server -- token create --name "my-laptop"

# List tokens
cargo run -p atomic-server -- token list

# Revoke a token
cargo run -p atomic-server -- token revoke <token-id>
```

See [Token Management](/self-hosting/token-management/) for more details.

## Next Steps

- [Docker Compose setup](/self-hosting/docker-compose/)
- [Configuration options](/self-hosting/configuration/)
- [Connect the iOS app](/guides/ios-app/)
