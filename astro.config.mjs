import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({site:'https://caseymcgon.github.io',output:'static',trailingSlash:'always',integrations:[mdx(),sitemap()],vite:{plugins:[tailwindcss()]}});
