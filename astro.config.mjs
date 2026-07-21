// @ts-check
import { defineConfig } from 'astro/config';

// Swap this for your real Cloudflare Pages domain once it's live.
export const SITE_URL = 'https://battle-letter.pages.dev';

export default defineConfig({
  site: SITE_URL,
  // static output — Cloudflare Pages just serves dist/
});
