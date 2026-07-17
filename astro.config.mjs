// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import seoGraph from '@jdevalk/astro-seo-graph/integration';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { fileURLToPath } from 'node:url';

/**
 * Remark plugin: auto-inject `import Gallery from '@components/AutoGallery.astro'`
 * into any MDX file that uses <Gallery> without importing it, and add a stable
 * `postId` prop (derived from the file path under src/content/blog/) so the
 * gallery resolves its images by content-collection id instead of the request
 * URL — which is unreliable during prerender on hosts like Cloudflare Pages.
 * This lets gallery posts contain just <Gallery title="..." columns={3} />
 * with no boilerplate imports, exports, or runtime URL parsing.
 */
function remarkAutoGallery() {
	return (tree, file) => {
		// Recursively check if any node is a <Gallery> JSX element
		function hasGalleryJSX(nodes) {
			for (const node of nodes) {
				if (
					(node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
					node.name === 'Gallery'
				) {
					return true
				}
				if (node.children && hasGalleryJSX(node.children)) return true
			}
			return false
		}

		if (!hasGalleryJSX(tree.children)) return

		// Derive the content-collection id from the file path, e.g.
		//   src/content/blog/2026/pressconf-2026/index.mdx
		//     → "2026/pressconf-2026"
		let postId = ''
		const filePath = (file?.data?.astro?.source ?? file?.path ?? '').toString()
		const m = filePath.match(/src[\\/]content[\\/]blog[\\/](.+?)(?:[\\/]index)?\.mdx?$/)
		if (m) postId = m[1]

		// Add (or set) the postId attribute on every <Gallery> element
		function addPostIdToGalleries(nodes) {
			for (const node of nodes) {
				if (
					(node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
					node.name === 'Gallery'
				) {
					const hasPostId = node.attributes?.some(
						(a) => a.type === 'mdxJsxAttribute' && a.name === 'postId'
					)
					if (!hasPostId && postId) {
						node.attributes = node.attributes || []
						node.attributes.push({
							type: 'mdxJsxAttribute',
							name: 'postId',
							value: { type: 'mdxJsxAttributeValueExpression', value: JSON.stringify(postId), data: { estree: { type: 'Program', body: [{ type: 'ExpressionStatement', expression: { type: 'Literal', value: postId, raw: JSON.stringify(postId) } }], sourceType: 'module' } } },
						})
					}
				}
				if (node.children) addPostIdToGalleries(node.children)
			}
		}
		addPostIdToGalleries(tree.children)

		// Skip if Gallery is already imported
		const alreadyImported = tree.children.some(
			(node) => node.type === 'mdxjsEsm' && node.value?.includes('Gallery')
		)
		if (alreadyImported) return

		// Inject: import Gallery from '@components/AutoGallery.astro'
		tree.children.unshift({
			type: 'mdxjsEsm',
			value: "import Gallery from '@components/AutoGallery.astro'",
			data: {
				estree: {
					type: 'Program',
					body: [
						{
							type: 'ImportDeclaration',
							specifiers: [
								{
									type: 'ImportDefaultSpecifier',
									local: { type: 'Identifier', name: 'Gallery' },
								},
							],
							source: {
								type: 'Literal',
								value: '@components/AutoGallery.astro',
								raw: "'@components/AutoGallery.astro'",
							},
						},
					],
					sourceType: 'module',
				},
			},
		})
	}
}

// https://astro.build/config
export default defineConfig({
	site: 'https://thefragens.com',
	// Astro 7 changed the default of `compressHTML` from `true` (HTML-aware) to
	// `'jsx'` (JSX rules, which strips spaces between adjacent inline elements).
	// This site relies on the old HTML-aware whitespace handling for visual
	// spacing in cards, pagination, and other inline-heavy layouts, so we
	// explicitly opt back into `true` to match the v6 behavior.
	compressHTML: true,
	integrations: [ mdx(), sitemap(), pagefind(), seoGraph()],
	markdown: {
		processor: unified({ remarkPlugins: [remarkAutoGallery] }),
		shikiConfig: {
			theme: 'github-light',
		},
	},
	vite: {
		resolve: {
			alias: {
				'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
			},
		},
	},
	redirects: {
		'/blog/': '/',
	},
});
