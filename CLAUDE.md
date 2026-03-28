# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview built site
```

No lint or test commands are configured.

## Architecture

**Surgical Diversions** — a personal blog for Andy Fragen (trauma/acute care surgeon), built on Astro with MDX, sitemap, and RSS integrations.

### Content

Blog posts live in `src/content/blog/` organized by year subdirectories (2001–present). The collection is defined in `src/content.config.ts` using a glob loader and Zod schema with required fields: `title`, `description`, `pubDate`; optional: `updatedDate`, `heroImage`.

Static pages (`about`, `gallery`, `plugins`, `radio-userland-*`) live directly in `src/pages/` as `.astro` or `.md` files.

### Routing

- `/blog/[...slug].astro` — individual blog posts from the content collection
- `[...slug].astro` — catch-all route for other content (recently added, untracked)
- `rss.xml.js` — RSS feed generation

### Layouts

- **`BlogPost.astro`** — wraps blog collection entries; accepts `title`, `description`, `pubDate`, `updatedDate`, `heroImage`
- **`GalleryLayout.astro`** — for MDX posts with image galleries; uses `import.meta.glob()` to collect images from `/src/content/posts/*/images/` and filters by post slug at runtime

### Gallery Component

`src/components/Gallery.astro` is a self-contained image gallery with a custom lightbox built on the native HTML5 `<dialog>` element (no external dependencies). It accepts `images: ImageMetadata[]`, `title?`, and `columns?`. Features: WebP optimization, arrow key/touch navigation, focus management.

### Styling

Single global stylesheet at `src/styles/global.css` using CSS variables. The design is Bear Blog-inspired with a 720px max content width and a single 720px responsive breakpoint. Font: Atkinson (self-hosted in `public/fonts/`).

### Site Constants

`src/consts.ts` exports `SITE_TITLE` and `SITE_DESCRIPTION` used across components.
