import type { AvatarSize, AvatarVariant } from '../models';

/* ─── Size Map ─────────────────────────────────────────────── */
export const AVATAR_SIZE_MAP: Record<AvatarSize, { dimension: number; fontSize: number; borderWidth: number }> = {
  sm: { dimension: 28, fontSize: 12, borderWidth: 2 },
  md: { dimension: 40, fontSize: 16, borderWidth: 2 },
  lg: { dimension: 56, fontSize: 22, borderWidth: 3 },
};

/* ─── Custom Size Ratios (used when `size` is a number) ────── */
/** Font size = dimension × this ratio */
export const CUSTOM_FONT_SIZE_RATIO = 0.4;
/** Border width = dimension × this ratio (min 2px) */
export const CUSTOM_BORDER_WIDTH_RATIO = 0.05;
/** Minimum border width in px */
export const CUSTOM_BORDER_WIDTH_MIN = 2;
/** Rounded variant border radius = dimension × this ratio */
export const ROUNDED_RADIUS_RATIO = 0.2;

/* ─── Default Values ───────────────────────────────────────── */
export const AVATAR_DEFAULTS = {
  size: 'md' as AvatarSize,
  variant: 'circular' as AvatarVariant,
} as const;

