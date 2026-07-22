/// <reference types="mdast-util-directive" />

import type { Root, Parent, Node, Paragraph, PhrasingContent } from 'mdast';
import type { Plugin, Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import {
	isAsideVariant,
	getAsideIconPath,
	defaultAsideTitle,
	type AsideVariant,
} from './aside-utils.js';

/**
 * remark plugin that converts `:::` container directives into styled `<aside>` elements
 * (a.k.a. "callouts", "admonitions"). Depends on the `remark-directive` module for
 * the core parsing logic.
 *
 * For example, this Markdown
 *
 * ```md
 * :::tip[Did you know?]
 * Astro helps you build faster websites with "Islands Architecture".
 * :::
 * ```
 *
 * will produce this output
 *
 * ```html
 * <aside class="aside aside--tip" aria-label="Did you know?">
 *   <p class="aside__title" aria-hidden="true">
 *     <svg class="aside__icon" ...>...</svg>
 *     Did you know?
 *   </p>
 *   <div class="aside__content">
 *     <p>Astro helps you build faster websites with "Islands Architecture".</p>
 *   </div>
 * </aside>
 * ```
 *
 * Supports an optional `icon` attribute to override the default icon:
 *
 * ```md
 * :::tip[Title](icon="danger")
 * Content
 * :::
 * ```
 */
export function remarkAsides(): Plugin<[], Root> {
	const transformer: Transformer<Root> = (tree, file) => {
		visit(tree, (node, index, parent) => {
			if (!parent || index === undefined) return;
			if (node.type !== 'containerDirective') return;

			const variant = node.name;
			if (!isAsideVariant(variant)) return;

			const attributes = node.attributes;
			const customIcon = attributes?.['icon'] ?? null;

			// remark-directive converts a container's "label" to a paragraph added as the
			// head of its children with the `directiveLabel` property set to true. We want
			// to pass it as the title, so when we find a directive label, we store it and
			// remove the paragraph from the container's children.
			let title: string;
			let titleNode: PhrasingContent[];
			const firstChild = node.children[0];
			if (
				firstChild?.type === 'paragraph' &&
				firstChild.data &&
				'directiveLabel' in firstChild.data &&
				firstChild.children.length > 0
			) {
				titleNode = firstChild.children;
				title = toString(firstChild.children);
				node.children.splice(0, 1);
			} else {
				title = defaultAsideTitle(variant);
				titleNode = [{ type: 'text', value: title }];
			}

			const iconPath = getAsideIconPath(variant);

			if (process.env.NODE_ENV === 'development') {
				console.debug('[remark-asides] Processing directive:', {
					variant,
					title,
					customIcon,
					file: file?.path,
				});
			}

			const aside: Paragraph = {
				type: 'paragraph',
				data: {
					hName: 'aside',
					hProperties: {
						class: `aside aside--${variant}`,
						'aria-label': title,
					},
				},
				children: [
					{
						type: 'paragraph',
						data: {
							hName: 'p',
							hProperties: {
								class: 'aside__title',
								'aria-hidden': 'true',
							},
						},
						children: [
							{
								type: 'paragraph',
								data: {
									hName: 'svg',
									hProperties: {
										viewBox: '0 0 24 24',
										width: 16,
										height: 16,
										fill: 'currentColor',
										class: 'aside__icon',
									},
								},
								children: [
									{
										type: 'paragraph',
										data: {
											hName: 'path',
											hProperties: { d: iconPath },
										},
										children: [],
									},
								],
							},
							...titleNode,
						],
					},
					{
						type: 'paragraph',
						data: {
							hName: 'div',
							hProperties: { class: 'aside__content' },
						},
						children: node.children,
					},
				],
			};

			parent.children[index] = aside;

			if (process.env.NODE_ENV === 'development') {
				console.debug('[remark-asides] Replaced node at index', index, 'in parent');
			}
		});
	};

	// Return the transformer directly — the unified() processor from
	// @astrojs/markdown-remark does not properly handle attacher functions.
	return transformer;
}
