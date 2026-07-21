# battle-letter

Event flyer for **USCG Red Team vs DTRA** — a one-page, static, retro-streetball-comic site.

Astro 5, static output, zero runtime JS. Built to drop straight onto Cloudflare Pages.

---

## Edit the content

**Everything lives in one file: [`src/data/event.ts`](src/data/event.ts).** You do not need to touch
any `.astro` file to change the flyer.

Lines marked `// TODO` are placeholders — swap these before you share the link:

| Field | What it is |
| --- | --- |
| `dayOfWeek`, `date`, `year` | Game date |
| `tipoff`, `tipoffPlain`, `shootaround` | Times |
| `venue`, `venueLine2`, `venueAddress` | Location |
| `rsvpEmail` | **The RSVP inbox.** Currently `hoops@example.com` — the buttons don't go anywhere useful until you change this. |

`roster`, `tape`, and `rules` below it are the joke content — add, remove, or reorder freely. Roster
names are intentionally fake callsigns; player card art auto-generates from list position, so you can
add a 9th player and it just works.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the built dist/
```

## Deploy to Cloudflare Pages

Connect the GitHub repo in the Cloudflare dashboard (Workers & Pages → Create → Pages → Connect to Git):

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 or newer |

Then set `SITE_URL` in [`astro.config.mjs`](astro.config.mjs) to the real domain so canonical/OG URLs
are correct.

## Notes

- Fonts (Anton + Barlow Condensed) load from Google Fonts, with poster-y system fallbacks if the
  request fails.
- Player faces, the basketball, and every icon are hand-written inline SVG — no image assets, no
  external requests.
- Respects `prefers-reduced-motion` (kills the marquee, sunburst spin, and ball bob).
- There's an `og:image` pointing at `/og.png` that doesn't exist yet — either add one to `public/`
  or drop the two `og:image` lines from `src/layouts/Base.astro`.
