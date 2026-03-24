/* ─── Helpers ──────────────────────────────────────────────── */

/**
 * Extract up to 2 initials from a full name.
 *
 * @example
 * getInitials('Quốc Thanh') // => 'QT'
 * getInitials('Alice')       // => 'A'
 * getInitials('')            // => ''
 */
export const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);
  if (words.length === 0 || words[0] === '') return '';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

/** Parse hex/hsl color to relative luminance (0 = black, 1 = white) */
const getLuminanceFromHex = (hex: string): number => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

/**
 * Parse HSL string and estimate luminance.
 * For `hsl(h, s%, l%)`, we use lightness as a rough luminance proxy.
 */
const getLuminanceFromHsl = (hsl: string): number => {
  const match = hsl.match(/hsl\(\s*\d+\s*,\s*\d+%\s*,\s*(\d+)%\s*\)/);
  if (!match) return 0.5;
  return parseInt(match[1], 10) / 100;
};

/**
 * Auto-detect contrast text color: white for dark backgrounds, dark for light.
 *
 * Supports hex (#rrggbb) and hsl(h, s%, l%) inputs.
 */
export const getContrastText = (bgColor: string): string => {
  try {
    const luminance = bgColor.startsWith('hsl')
      ? getLuminanceFromHsl(bgColor)
      : getLuminanceFromHex(bgColor);
    return luminance < 0.5 ? '#fff' : '#212121';
  } catch {
    return '#212121';
  }
};
