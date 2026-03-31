---
title: 'Astro & Claude'
pubDate: '2026-03-31'
categories: ['code']
description: 'After seventeen years on WordPress, I rebuilt my blog as a static site using Astro and Claude — and I had no idea what either of them were a week ago.'
---

OMFG! 🤯

If you can read this, my WordPress blog is now a static site built with Astro and Claude. And yes, I absolutely cannot forget Claude. 😉

A little history: from 2001 to 2007 every website I ran was a static site. Then in 2007 I discovered WordPress and never looked back — until now. Seventeen years later, here we are. I exported my entire WordPress blog, converted it to Markdown, and rebuilt the whole thing with Astro. Before last week I had never touched either Astro or Claude Code. Not once.

The WordPress-to-Markdown migration was the first hurdle, and it was a big one. There are scripts out there that do a reasonable job of the export, but "reasonable" still means hundreds of little formatting quirks, broken shortcodes, mangled image paths, and encoding oddities scattered across more than two decades of posts. Claude worked through them systematically — finding patterns, writing fixup scripts, handling edge cases I hadn't even noticed yet. Doing that by hand would have taken weeks. With Claude it took days.

Building the Astro site from scratch was where things got really fun. I'd describe what I wanted — a card grid, a category page, a paginated listing, a search modal — and Claude would build it. I'd push back, refine, ask for something different, and we'd iterate. The whole design, every component, all the CSS, the RSS feed, the sitemap integration, the image gallery lightbox — none of it would exist without Claude. I'm a surgeon, not a front-end developer. 😄

What surprised me most was how deep the rabbit hole goes. Once the site was working I started looking at performance, and Claude just kept finding things to improve and fixing them. Things I wouldn't have known to look for, let alone how to fix.

Of course, going static means saying goodbye to plugins. Including a bunch I wrote myself. That stings a little, I won't lie. But for a blog that's fundamentally just text and photos, a database was always overkill. Pages load fast, there's nothing to hack, no updates to babysit, no server to maintain. It deploys straight to Cloudflare Pages on every git push.

I've got a couple of other sites that have been running on WordPress for years with no real reason to need a database. They're next. If this project taught me anything, it's that the combination of Astro and Claude makes something that used to feel impossibly complex feel surprisingly approachable — even for someone whose day job involves a lot more scalpels than semicolons. 🔪
