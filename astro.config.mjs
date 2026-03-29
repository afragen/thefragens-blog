// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

/**
 * Remark plugin: auto-inject `import Gallery from '@components/AutoGallery.astro'`
 * into any MDX file that uses <Gallery> without importing it.
 * This lets gallery posts contain just <Gallery title="..." columns={3} />
 * with no boilerplate imports or export consts.
 */
function remarkAutoGallery() {
	return (tree) => {
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
	integrations: [mdx({ remarkPlugins: [remarkAutoGallery] }), sitemap(), pagefind()],
	markdown: {
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
		'/': '/blog',
	},
});
