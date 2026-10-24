# Leocode landing page

A fast, bilingual (English / Arabic) landing page for **Leocode** — an open-source, volunteer-powered tech community across the Arab world.

The site is fully static. There is no server, database, or runtime backend to maintain.

- **Framework:** Astro 7 (static output)
- **Styling:** CSS with design tokens (no UI framework)
- **Theme:** light by default, with a dark-mode toggle in the header
- **Languages:** `/` (English) and `/ar/` (Arabic, RTL)
- **Content:** JSON files in `src/data/`
- **Editing:** [Pages CMS](https://pagescms.org) (Git-based, no backend)
- **Hosting:** Netlify

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:4321.

```bash
npm run build    # production build in dist/
npm run preview  # preview the production build
npm run check    # TypeScript + Astro diagnostics
```

## Environment variables

Copy `.env.example` to `.env` and set your real links. `.env` is git-ignored.

| Variable | Example | Used for |
| --- | --- | --- |
| `PUBLIC_GITHUB_URL` | `https://github.com/leocode` | GitHub button and card |
| `PUBLIC_HUGGINGFACE_URL` | `https://huggingface.co/leocode` | Hugging Face card |
| `PUBLIC_YOUTUBE_URL` | `https://youtube.com/@leocode` | YouTube card |
| `PUBLIC_EMAIL` | `hello@leocode.org` | Email card (`mailto:` is added automatically) |
| `PUBLIC_NAHNO_URL` | `https://nahno.org` | Nahno.org credit link |
| `SITE_URL` | `https://leocode.org` | Canonical URLs, Open Graph URLs, sitemap, robots.txt |

The URLs currently in `.env.example` are **placeholders**. Replace them before launch. On Netlify, add the same variables under **Site configuration → Environment variables**.

## Updating content (no backend)

Content lives in three JSON files. Images live in `public/images/`.

| File | What it controls |
| --- | --- |
| `src/data/site.json` | All page copy: hero, about, section headings, buttons, footer |
| `src/data/activities.json` | Activity cards |
| `src/data/members.json` | Team section (hidden while empty) |

### Option A — Pages CMS (recommended)

[Pages CMS](https://pagescms.org) gives you a friendly editing UI on top of this repository. It commits changes to GitHub; Netlify then rebuilds the site automatically.

1. Push this repository to GitHub.
2. Sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub and install the Pages CMS GitHub App for the repository.
3. Select the repository and branch. The editor reads `.pages.yml`.
4. Edit **Site copy**, **Activities**, or **Team members**. Upload images directly in the image fields.
5. Save. Pages CMS commits the change; Netlify deploys it.

No token, server, or database is needed. Editors only need write access to the repository.

### Adding an activity

1. In Pages CMS, open **Activities** and add an entry.
2. Fill in both English and Arabic fields.
3. Upload a **4:3** image (for example 1200 × 900, WebP or JPG).
4. Set the date. Activities are sorted newest first automatically.
5. Optionally add a link.

### Adding a team member

The team section is **intentionally hidden** while `members.json` is empty. Add the first member and the section (plus the Team nav link) appears automatically.

1. Open **Team members** in Pages CMS and add an entry.
2. Upload a **4:5** portrait (for example 960 × 1200).
3. Add the name, role in both languages, and optional GitHub / LinkedIn URLs.

### Option B — Edit the files directly

You can always edit the JSON files on GitHub (or locally) and upload images to:

- `public/images/activities/` → referenced as `/images/activities/...`
- `public/images/members/` → referenced as `/images/members/...`

Keep both language fields filled in. Missing Arabic copy will appear blank on `/ar/`.

## Deploy to Netlify

1. Push the repository to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Build command: `npm run build`; publish directory: `dist` (already set in `netlify.toml`).
4. Add the environment variables from `.env.example` under **Site configuration → Environment variables**.
5. Deploy. Every push or Pages CMS save triggers a new build.

`netlify.toml` pins Node 22 and adds long-term caching for hashed assets plus basic security headers.

## Project structure

```
public/
  images/activities/       activity illustrations (replaceable)
  images/members/          member photos (empty until you add the team)
  logo-light.webp          lion mark for light mode
  logo-dark.webp           lion mark for dark mode
  logo-mark.webp           transparent mark (watermark / placeholder)
  og.png                   social sharing image
src/
  assets/                  original logo files
  components/              Header, Hero, About, Activities, Members, Community, Footer
  data/                    editable content (JSON)
  layouts/                 Base + Landing layout
  lib/content.ts           typed content helpers and env links
  pages/                   / (English), /ar/ (Arabic), robots.txt
  styles/global.css        design tokens and all styles
.pages.yml                 Pages CMS schema
netlify.toml               Netlify build + headers
```

## Design

| Token | Value |
| --- | --- |
| Brand dark | `#191D1F` |
| Lion / accent | `#EFA524` |
| Beard / cream | `#EEDEC1` |

The site opens in **light mode** by default. The sun/moon button in the header switches to dark mode and remembers the choice in `localStorage`. Both palettes are defined in `src/styles/global.css` under `:root` (light) and `:root[data-theme='dark']` (dark). Change the tokens there and the whole site follows.

## Notes

- The three activities and their illustrations are sample content — replace them with real Leocode activities.
- The team section is not rendered until you add members (per the current brief).
- The site is accessible by default: semantic landmarks, skip link, keyboard-friendly menu, theme toggle with a live label, visible focus states, and `prefers-reduced-motion` support.
- Fonts (Space Grotesk + Alexandria) are self-hosted through Fontsource; no external font requests.
