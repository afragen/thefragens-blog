import paletteJson from './palette.json';

type ColorName = keyof typeof paletteJson.colors;

function resolve(name: string): string {
	return paletteJson.colors[name as ColorName] ?? name;
}

/** Site-wide CSS variable values, resolved from palette.json color names */
export const palette = {
	accent:    resolve(paletteJson.defaults.accent),
	accentDark:resolve(paletteJson.defaults.accentDark),
	black:     paletteJson.defaults.black,
	gray:      paletteJson.defaults.gray,
	grayLight: paletteJson.defaults.grayLight,
	grayDark:  paletteJson.defaults.grayDark,
};

/** Per-category accent colors, resolved from palette.json color names */
export type CategoryColors = { accent: string; accentDark: string };
export const categoryPalette = Object.fromEntries(
	Object.entries(paletteJson.categories).map(([slug, val]) => [
		slug,
		{ accent: resolve(val.accent), accentDark: resolve(val.accentDark) },
	])
) as Record<string, CategoryColors>;
