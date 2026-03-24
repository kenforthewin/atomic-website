---
title: Installation
description: Download and install the Atomic desktop app.
---

The Atomic desktop app is built with Tauri and runs natively on macOS.

## Download

Download the latest release from [GitHub Releases](https://github.com/kenforthewin/atomic/releases/latest).

### macOS

1. Download the `.dmg` file from the latest release
2. Open the DMG and drag Atomic to your Applications folder
3. Launch Atomic from Applications

:::note
On first launch, macOS may show a security warning. Right-click the app and choose "Open" to bypass Gatekeeper.
:::

## First Run

When you first launch Atomic, it will:

1. Create a local database in `~/Library/Application Support/com.atomic.app/`
2. Start a local server (sidecar process) that the UI connects to
3. Open the main window

## Configure AI

To enable semantic search, wiki synthesis, and chat, you'll need to configure an AI provider. See [AI Providers](/getting-started/ai-providers/).
