# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview built site
```

No lint or test commands are configured.

## Creating New Posts

Use `new-post.mjs` to scaffold draft posts, or the project slash commands:

### Slash commands (inside Claude Code)

```
/new-post My Post Title
/new-gallery-post My Gallery Post Title
```

### Terminal

```bash
node new-post.mjs "My Post Title"            # plain post
node new-post.mjs --gallery "My Post Title"  # gallery post
```

Run without arguments to be prompted interactively for the title.

### What gets created

**Plain post** — a single markdown file:
```
src/content/blog/YEAR/slug.md
```

**Gallery post** — an MDX file with an images directory:
```
src/content/blog/YEAR/slug/index.mdx
src/content/blog/YEAR/slug/images/
```

Both are created with `draft: true`, today's date as `pubDate`, and empty `description` fields to fill in. Plain posts default to `categories: ['uncategorized']`; gallery posts default to `categories: ['photos']`. Gallery posts include a `<Gallery>` placeholder — drop images into the `images/` directory and they appear automatically (no imports needed).

If a post with the same slug already exists, a suffix is automatically appended (`-2`, `-3`, etc.) rather than erroring out.

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `pubDate` | yes | `YYYY-MM-DD` format; displayed in UTC to avoid off-by-one-day issues |
| `description` | yes | Use double quotes if the value contains an apostrophe |
| `categories` | no | Array of strings |
| `updatedDate` | no | |
| `featuredImage` | no | Displayed at the top of the individual post page; listing pages always use the generated SVG instead |
| `draft` | no | Set `true` to exclude from build |

## Architecture

**Surgical Diversions** — a personal blog for Andy Fragen (trauma/acute care surgeon), built on Astro with MDX, sitemap, and RSS integrations.

### Content

Blog posts live in `src/content/blog/` organized by year subdirectories (2001–present). The collection is defined in `src/content.config.ts` using a glob loader and Zod schema with required fields: `title`, `description`, `pubDate`; optional: `updatedDate`, `featuredImage`.

Static pages (`about`, `plugins`, `radio-userland-*`) live directly in `src/content/pages/` as `.astro`, `.mdx`, or `.md` files.

### Routing

- `src/pages/index.astro` — blog listing page (page 1); served at `/`
- `src/pages/blog/page/[page].astro` — paginated listing pages (pages 2+); served at `/blog/page/[n]/`
- `src/pages/blog/category/[category]/index.astro` — category listing page (page 1); served at `/blog/category/[slug]/`
- `src/pages/blog/category/[category]/page/[page].astro` — paginated category pages (pages 2+); served at `/blog/category/[slug]/page/[n]/`
- `src/pages/blog/[...slug].astro` — individual blog posts from the content collection
- `src/pages/[...slug].astro` — catch-all route for static pages (`about`, `plugins`, `radio-userland-*`)
- `src/pages/rss.xml.js` — RSS feed generation
- `public/robots.txt` — static robots file; served directly, unaffected by redirects

`astro.config.mjs` redirects `/blog/` → `/` so old links remain valid. All listing pages show `PAGE_SIZE` posts and include numbered pagination with prev/next arrows. Category page 2+ breadcrumbs link back to the category page 1. All "back to listing" links point to `/`.

### Layouts

- **`BlogPost.astro`** — wraps blog collection entries; accepts `title`, `description`, `pubDate`, `updatedDate`, `featuredImage`

### Styling

Single global stylesheet at `src/styles/global.css` using CSS variables. The design is Bear Blog-inspired with a 720px max content width. Responsive breakpoint fires at `max-width: 720px` and also at `max-height: 500px` in landscape orientation (covers phones like the iPhone 17 in landscape).

**Fonts** — Primary: MonaSans variable font (`wght,opsz` axes, 100–900), self-hosted in `public/fonts/`. Fallback: Atkinson (regular + bold woff). Body stack: `"MonaSans", "Atkinson", sans-serif`.

**Color palette** — CSS variables (`--accent`, `--accent-dark`, `--black`, `--gray`, `--gray-light`, `--gray-dark`, `--gray-gradient`) are injected into `:root` by `BaseHead.astro` from `src/palette.ts`, which resolves named colors from `src/palette.json`. Default accent: `#2337ff` (electric-blue); default accent-dark: `#000d8a` (navy).

**Category accent colors** — `src/palette.json` maps each category slug to a named `accent`/`accentDark` pair (e.g. `code` → green, `wordpress` → blue, `medicine` → cyan). `BaseHead.astro` injects per-category variables when rendering a category page; `BlogPlaceholder.astro` accepts color arrays to blend all of a post's category colors into the generated SVG.

**Post card layout** — Cards on all listing pages (blog index, paginated pages, category pages) use a flex-column `.card-body`. Order: title → description → `.card-footer`. `.card-footer` is a flex row with `margin-top: auto` (pins it to the card bottom): date on the left (`white-space: nowrap`), category pills on the right (`justify-content: flex-end`).

**Key global rules** — `blockquote` has a 4px left border in `var(--accent)`; `figure figcaption` is 0.8em gray centered text; `:focus-visible` gets a 2px `var(--accent)` outline.

### Performance

The LCP element on every page is `background-operate.png` (the header image). `Header.astro` renders it with `loading="eager"` and `fetchpriority="high"`.

Three measures reduce render-blocking and critical-path latency:

1. **Inlined header CSS** — `Header.astro` uses `<style is:inline>` so its styles are embedded directly in the HTML rather than extracted to an external stylesheet. This eliminates the render-blocking `/_astro/Header.*.css` request. Bare element selectors (`img`, `nav`) are scoped to `header > div img` and `header > nav` to prevent global leakage since `is:inline` disables Astro's automatic CSS scoping.
2. **Single variable font** — `global.css` declares only the `MonaSansVF[wght,opsz].woff2` variable font (100–900 weight range). The redundant static fallback `@font-face` rules for Regular and Bold were removed — their overlapping weight ranges caused browsers to download all three files (~198 KiB). Now only the variable font loads (~98 KiB).
3. **Font preload** — `BaseHead.astro` preloads `MonaSansVF[wght,opsz].woff2` so the font starts downloading with the HTML document rather than chained after the CSS.

### Site Constants

`src/consts.ts` exports constants used across components:

| Constant | Type | Purpose |
|---|---|---|
| `SITE_TITLE` | `string` | Site name used in `<title>` and OG tags |
| `SITE_DESCRIPTION` | `string` | Default meta description |
| `SHOW_CARD_IMAGES` | `boolean` | Controls whether the `BlogPlaceholder` SVG image is rendered on post cards across all listing pages (index, paginated, category). Set to `false` to hide card images site-wide. |
| `PAGE_SIZE` | `number` | Number of posts per page on all listing pages (index, paginated, category). |

## Components

### `AutoGallery.astro`

Drop-in `<Gallery>` replacement for MDX posts that requires zero imports in the post file. At build time, Vite globs all images across all posts (`../content/blog/**/images/*.{jpg,jpeg,png,gif,webp,avif,svg}`). At runtime, it filters to the current post by matching `Astro.url.pathname` against the image paths, then delegates to `Gallery.astro`. Renders nothing if the `images/` directory is empty or absent.

Wired up automatically: the `remarkAutoGallery` plugin in `astro.config.mjs` detects any MDX file that uses `<Gallery>` and injects `import Gallery from '@components/AutoGallery.astro'` into the file's ESM imports at build time. No manual import or `components` prop needed in the MDX or in `[...slug].astro`.

Props: `title?: string`, `columns?: number`

### `BaseHead.astro`

Included on every page. Injects CSS variable palette into `:root`, imports `global.css`, sets canonical URL, Open Graph and Twitter Card meta tags, and adds RSS/sitemap links. Defaults the OG image to `background-operate.png`.

Preloads `MonaSansVF[wght,opsz].woff2` (the primary display font). See the Performance section above.

Props: `title: string`, `description: string`, `image?: ImageMetadata`

### `BlogPlaceholder.astro`

Generates a deterministic decorative SVG graphic using a seeded PRNG (FNV-1a hash feeding an LCG). Produces sweeping filled bands, distorted swirl rings, wave patterns, and accent lines on a 480×270 canvas. Used as the card image on all listing pages (blog index, paginated pages, category pages) — `featuredImage` is never shown there. Card image display is controlled by `SHOW_CARD_IMAGES` in `src/consts.ts`; the image area uses `aspect-ratio: 32 / 9`.

Colors are distributed across SVG elements using `pick(arr, i)` with modular wrapping, so multiple category colors appear across bands, rings, and accent lines. Single-color usage (passing `accent`/`accentDark` directly) still works unchanged.

Props: `accent?: string`, `accentDark?: string`, `accents?: string[]`, `accentDarks?: string[]`, `seed?: string`

### `Footer.astro`

Site footer. Displays copyright with current year (computed at build time) and embeds `SocialLinks`. Applies a linear gradient background from the CSS palette.

### `FormattedDate.astro`

Renders a `<time>` element with an ISO `datetime` attribute and a human-readable `en-us` short date (e.g. "Mar 29, 2025"). Uses `timeZone: 'UTC'` to prevent off-by-one-day display caused by frontmatter dates being parsed as UTC midnight.

Props: `date: Date`

### `Gallery.astro`

Self-contained responsive image grid with a native `<dialog>` lightbox (no external dependencies). Generates a unique per-instance ID to support multiple galleries on one page. Derives alt text from filenames. Thumbnails are optimized via Astro's `<Image>` (WebP, 800×600, quality 80).

Lightbox images use `getImage()` at build time to resolve each image's full-size WebP URL (no explicit resize — original dimensions are preserved). This ensures the lightbox `src` points to the actual built `/_astro/` asset path rather than the original source path, which would 404 in production.

Lightbox features: Escape key / backdrop click to close, arrow key and touch swipe navigation (>50px threshold), image preload indicator, current/total counter, focus returns to the triggering thumbnail on close.

Props: `images: ImageMetadata[]`, `title?: string`, `columns?: number` (default 3, min 2)

### `Header.astro`

Main site header. Dynamically imports and renders `background-operate.png` (1020×510) with `loading="eager"` and `fetchpriority="high"`, filling the full width of the header div with no border-radius. Uses `<style is:inline>` to embed styles directly in the HTML (eliminating the render-blocking external CSS file); element selectors are narrowed to `header > div img` and `header > nav` since `is:inline` disables Astro's automatic scoping. Includes a visually hidden skip-to-content link for accessibility, the site title, `NavLinks`, and a Mastodon `rel="me"` link.

### `HeaderLink.astro`

Navigation anchor with automatic active-state detection. Compares `Astro.url.pathname` against `href` (full path and first segment) and adds an `.active` class that triggers an accent-colored bottom border.

Props: `href: string`, plus any HTML anchor attributes.

### `NavLinks.astro`

Main navigation menu. On desktop shows links inline; on mobile (≤720px viewport width, or ≤500px viewport height in landscape) collapses to a hamburger button. Links: Home, About Me, Plugins, Radio UserLand (dropdown with Radio UserLand Tools and Radio UserLand Scripts). The search button dispatches a `search:open` custom event picked up by `Search.astro`. Dropdown supports click, hover, focus-within, Escape key, and focusout.

### `PluginCard.astro`

Fetches plugin metadata at build time from WordPress.org or GitHub and renders an info card. WordPress data: strips HTML, truncates description to 147 chars, shows contributors and version. GitHub data: shows language and license, respects a `GITHUB_TOKEN` env var for rate limits. Fails gracefully with an inline error message.

Card header uses a column layout: the title row (icon + name) occupies the full width, with version/language/license chips on a separate row below. Long titles wrap naturally rather than truncating.

Props: `wordpress?: string` (plugin slug), `github?: string` (`owner/repo`)

### `PluginGrid.astro`

Flex grid wrapper for `PluginCard` components. 3 columns on desktop, 2 on tablet (≤720px), 1 on mobile (≤480px), with `1rem` gaps.

### `Search.astro`

Full-text search modal powered by Pagefind. Opens on Cmd/Ctrl+K or the search button. Pagefind is lazy-loaded from `/pagefind/pagefind.js` on first use. Debounces input 200ms, shows up to 8 results with title, excerpt, and up to 3 sub-results each. Enter navigates to the first result. Results area uses `aria-live="polite"`.

### `SocialLinks.astro`

Four icon links (Mastodon, Twitter, GitHub, Email) with `aria-hidden` SVGs and `.sr-only` screen-reader text. Opens in new tab with `rel="noopener noreferrer"`.

## Layouts

### `BlogPost.astro`

Full HTML document layout for blog collection entries. Displays featured image (if present), formatted pub/updated dates, category pill badges (linked to `/blog/category/{slug}/`), post body (marked `data-pagefind-body` for search indexing), and previous/next post navigation. Includes `Header` and `Footer`.

Props: `title`, `description`, `pubDate`, `updatedDate?`, `featuredImage?`, `categories?`, `prev?`, `next?`

