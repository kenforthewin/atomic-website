---
title: Browser Extension
description: Clip web pages directly into your Atomic knowledge base.
---

The Atomic browser extension lets you save web pages as atoms directly from your browser.

## Installation

The extension is available for Chromium-based browsers (Chrome, Arc, Brave, Edge).

1. Build the extension from the `extension/` directory in the repo
2. Open `chrome://extensions` in your browser
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any web page
2. Click the Atomic extension icon
3. The page content is extracted and sent to your Atomic server as a new atom
4. The source URL is automatically attached

The extension connects to your Atomic server instance — configure the server URL and API token in the extension settings.
