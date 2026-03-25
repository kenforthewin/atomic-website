// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
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
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Browser Extension', slug: 'guides/browser-extension' },
            { label: 'MCP Server', slug: 'guides/mcp-server' },
            { label: 'iOS App', slug: 'guides/ios-app' },
            { label: 'Importing Data', slug: 'guides/importing-data' },
          ],
        },
        {
          label: 'Self-Hosting',
          items: [
            { label: 'Docker Compose', slug: 'self-hosting/docker-compose' },
            { label: 'Configuration', slug: 'self-hosting/configuration' },
            { label: 'Token Management', slug: 'self-hosting/token-management' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Overview', slug: 'api/overview' },
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
