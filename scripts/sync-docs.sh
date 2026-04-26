#!/usr/bin/env bash
# Pull user-facing docs from kenforthewin/atomic into src/content/docs.
#
# Default behavior: clone the public atomic repo (shallow), copy docs/manual into
# src/content/docs. Required for fresh checkouts and CI builds.
#
# Caching: if src/content/docs already exists and --force is NOT passed, this
# script is a no-op. This keeps `npm run dev` fast on repeat runs. To get fresh
# docs, run `npm run sync-docs:fresh` or delete src/content/docs.
#
# Local override (optional, for fast iteration when editing atomic + the website
# side-by-side on the same machine): set ATOMIC_LOCAL_PATH=/path/to/atomic to
# copy from a local checkout instead of cloning. Not required, off by default.

set -euo pipefail

REPO_URL="${ATOMIC_REPO_URL:-https://github.com/kenforthewin/atomic.git}"
BRANCH="${ATOMIC_DOCS_BRANCH:-main}"
SOURCE_PATH="docs/manual"
TARGET_PATH="src/content/docs"

FORCE=false
if [ "${1:-}" = "--force" ] || [ "${1:-}" = "-f" ]; then
  FORCE=true
fi

if [ -d "$TARGET_PATH" ] && [ "$FORCE" = false ]; then
  echo "sync-docs: $TARGET_PATH already exists, skipping. Use --force or 'npm run sync-docs:fresh' to refresh."
  exit 0
fi

if [ -n "${ATOMIC_LOCAL_PATH:-}" ]; then
  if [ ! -d "$ATOMIC_LOCAL_PATH/$SOURCE_PATH" ]; then
    echo "sync-docs: ERROR — ATOMIC_LOCAL_PATH=$ATOMIC_LOCAL_PATH does not contain $SOURCE_PATH" >&2
    exit 1
  fi
  echo "sync-docs: copying from local path $ATOMIC_LOCAL_PATH/$SOURCE_PATH"
  rm -rf "$TARGET_PATH"
  mkdir -p "$(dirname "$TARGET_PATH")"
  cp -R "$ATOMIC_LOCAL_PATH/$SOURCE_PATH" "$TARGET_PATH"
  echo "sync-docs: copied $(find "$TARGET_PATH" -type f | wc -l | tr -d ' ') files."
  exit 0
fi

TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

echo "sync-docs: cloning $REPO_URL@$BRANCH (shallow)"
git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$TMPDIR/atomic" >/dev/null 2>&1 || {
  echo "sync-docs: ERROR — failed to clone $REPO_URL@$BRANCH" >&2
  exit 1
}

if [ ! -d "$TMPDIR/atomic/$SOURCE_PATH" ]; then
  echo "sync-docs: ERROR — $SOURCE_PATH not found in $REPO_URL@$BRANCH" >&2
  exit 1
fi

rm -rf "$TARGET_PATH"
mkdir -p "$(dirname "$TARGET_PATH")"
cp -R "$TMPDIR/atomic/$SOURCE_PATH" "$TARGET_PATH"

echo "sync-docs: copied $(find "$TARGET_PATH" -type f | wc -l | tr -d ' ') files to $TARGET_PATH"
