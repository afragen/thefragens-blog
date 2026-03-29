#!/usr/bin/env node
/**
 * new-post.mjs — scaffold a draft blog post
 *
 * Usage:
 *   node new-post.mjs           # plain post
 *   node new-post.mjs --gallery # post with Gallery component
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { join } from 'node:path';

const isGallery = process.argv.includes('--gallery');

// Title can be passed as a CLI argument or entered interactively
const argTitle = process.argv.filter(a => !a.startsWith('--') && !a.includes('node') && !a.includes('new-post')).join(' ').trim();

let title;
if (argTitle) {
	title = argTitle;
} else {
	const rl = createInterface({ input: process.stdin, output: process.stdout });
	const ask = (q) => new Promise((res) => rl.question(q, res));
	title = (await ask('Post title: ')).trim();
	rl.close();
}

if (!title) {
	console.error('Title is required.');
	process.exit(1);
}

const today = new Date();
const year = today.getUTCFullYear();
const pubDate = today.toISOString().slice(0, 10);

// Slugify: lowercase, replace spaces/special chars with hyphens
const slug = title
	.toLowerCase()
	.replace(/['']/g, '')
	.replace(/[^a-z0-9]+/g, '-')
	.replace(/^-+|-+$/g, '');

const dir = join('src', 'content', 'blog', String(year));

let finalSlug = slug;
let counter = 2;
while (true) {
	const candidate = isGallery
		? join(dir, finalSlug)
		: join(dir, `${finalSlug}.md`);
	if (!existsSync(candidate)) break;
	finalSlug = `${slug}-${counter++}`;
}

const filename = isGallery
	? join(dir, finalSlug, 'index.mdx')
	: join(dir, `${finalSlug}.md`);

const galleryBody = `
Here are some photos from ${title}.

<Gallery title="${title}" columns={3} />
`.trimStart();

const plainBody = `\nWrite your post here.\n`;

const categories = isGallery ? `['photos']` : `['uncategorized']`;

const frontmatter = `---
title: "${title}"
pubDate: '${pubDate}'
description: ""
categories: ${categories}
draft: true
---

${isGallery ? galleryBody : plainBody}`;

if (isGallery) {
	mkdirSync(join(dir, finalSlug, 'images'), { recursive: true });
} else {
	mkdirSync(dir, { recursive: true });
}
writeFileSync(filename, frontmatter);

console.log(`\nCreated: ${filename}`);
if (isGallery) console.log(`Images:  ${join(dir, finalSlug, 'images')}/`);
