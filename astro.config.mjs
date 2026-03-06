// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import rehypeRaw from 'rehype-raw'

// https://astro.build/config
export default defineConfig({
  site: 'https://1lsang.dev',
  integrations: [
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
      },
    }),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),

  markdown: {
    rehypePlugins: [rehypeRaw],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
})
