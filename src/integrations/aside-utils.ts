import { AstroError } from 'astro/errors';

export const asideVariants = ['note', 'tip', 'caution', 'danger'] as const;
export type AsideVariant = (typeof asideVariants)[number];

const asideIconNames: Record<AsideVariant, string> = {
	note: 'information',
	tip: 'rocket',
	caution: 'warning',
	danger: 'error',
};

export const asideIconPaths: Record<AsideVariant, string> = {
	note: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
	tip: 'M13 11.5v-2l3-3-1-1-3 3v2l-3 3 1 1 3-3zM9.5 9.5L6 6l-2 2v4l2 2 3-3zm7 7L16 13l3-3 2 2-3 3-1 1-1-1z',
	caution: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
	danger: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z',
};

const asideVariantSet = new Set<string>(asideVariants);
export function isAsideVariant(value: string): value is AsideVariant {
	return asideVariantSet.has(value);
}

export function getAsideIconName(variant: AsideVariant, customIcon?: string | null): string {
	let iconName = asideIconNames[variant];
	if (customIcon) {
		iconName = customIcon;
	}
	return iconName;
}

export function getAsideIconPath(variant: AsideVariant): string {
	return asideIconPaths[variant];
}

export function defaultAsideTitle(variant: AsideVariant): string {
	return variant.charAt(0).toUpperCase() + variant.slice(1);
}

export function throwInvalidAsideVariant(variant: string): never {
	throw new AstroError(
		'Invalid aside variant',
		`An aside variant must be one of ${asideVariants.map((i) => JSON.stringify(i)).join(', ')}, but received \`${variant}\`.`
	);
}
