---
title: Docker Compose
description: Deploy Atomic with Docker Compose for a production-ready setup.
---

Docker Compose is the recommended way to deploy Atomic for self-hosting.

## Basic Setup

Create a `docker-compose.yml`:

```yaml
services:
  atomic:
    image: ghcr.io/kenforthewin/atomic-server:latest
    ports:
      - "8080:8080"
    volumes:
      - atomic-data:/data
    environment:
      - DATA_DIR=/data

volumes:
  atomic-data:
```

Start the server:

```bash
docker compose up -d
```

## With Reverse Proxy

For HTTPS support, add nginx as a reverse proxy. See the `docker/` directory in the repo for a complete example with nginx configuration.

## Data Persistence

The `atomic-data` volume stores your databases. Back up this volume to preserve your knowledge base.
