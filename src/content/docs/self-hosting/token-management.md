---
title: Token Management
description: Create, list, and revoke API tokens for server authentication.
---

Atomic server uses named, revocable API tokens stored as SHA-256 hashes. A default token is auto-created on first run.

## CLI Commands

```bash
# Create a new token
cargo run -p atomic-server -- token create --name "my-laptop"

# List all tokens
cargo run -p atomic-server -- token list

# Revoke a token by ID
cargo run -p atomic-server -- token revoke <token-id>
```

## API Endpoints

Tokens can also be managed via the REST API:

```bash
# Create token
curl -X POST http://localhost:8080/api/auth/tokens \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "new-token"}'

# List tokens
curl http://localhost:8080/api/auth/tokens \
  -H "Authorization: Bearer <admin-token>"

# Revoke token
curl -X DELETE http://localhost:8080/api/auth/tokens/<token-id> \
  -H "Authorization: Bearer <admin-token>"
```

## Usage

Include the token in the `Authorization` header for all API requests:

```
Authorization: Bearer <your-token>
```
