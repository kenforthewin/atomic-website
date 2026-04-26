// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://atomicapp.ai',
  output: 'static',
  redirects: {
    '/blog/llm-wiki-needs-a-substrate': '/blog/rip-rag',
  },
  integrations: [
    sitemap(),
    starlight({
      title: 'Atomic',
      logo: {
        light: './src/assets/logo.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/kenforthewin/atomic' },
      ],
      customCss: ['./src/styles/docs.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Overview', slug: 'getting-started' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Self-Hosting', slug: 'getting-started/self-hosting' },
            { label: 'AI Providers', slug: 'getting-started/ai-providers' },
          ],
        },
        {
          label: 'Core Concepts',
          items: [
            { label: 'Atoms', slug: 'concepts/atoms' },
            { label: 'Tags', slug: 'concepts/tags' },
            { label: 'Semantic Search', slug: 'concepts/semantic-search' },
            { label: 'Wiki Synthesis', slug: 'concepts/wiki-synthesis' },
            { label: 'Chat', slug: 'concepts/chat' },
            { label: 'Canvas', slug: 'concepts/canvas' },
            { label: 'Daily Briefings', slug: 'concepts/daily-briefings' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Browser Extension', slug: 'guides/browser-extension' },
            { label: 'MCP Server', slug: 'guides/mcp-server' },
            { label: 'iOS App', slug: 'guides/ios-app' },
            { label: 'Importing Data', slug: 'guides/importing-data' },
            { label: 'URL Ingestion and Feeds', slug: 'guides/url-ingestion-and-feeds' },
            { label: 'Multi-Database', slug: 'guides/multi-database' },
          ],
        },
        {
          label: 'Self-Hosting',
          items: [
            { label: 'First-Run Setup', slug: 'self-hosting/first-run-setup' },
            { label: 'Docker Compose', slug: 'self-hosting/docker-compose' },
            { label: 'Configuration', slug: 'self-hosting/configuration' },
            { label: 'Token Management', slug: 'self-hosting/token-management' },
            { label: 'Data and Backups', slug: 'self-hosting/data-and-backups' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Overview', slug: 'api/overview' },
            { label: 'WebSocket Events', slug: 'api/websocket-events' },
            { label: 'Interactive Explorer', link: '/api/explorer' },
          ],
        },
      ],
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
