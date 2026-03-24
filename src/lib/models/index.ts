import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';

// ─── Types ──────────────────────────────────────────────
export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarVariant = 'circular' | 'rounded' | 'square';

// ─── Avatar Props ───────────────────────────────────────
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** URL of the avatar image */
  src?: string;
  /** Alternative text for the image (defaults to `name` or `'avatar'`) */
  alt?: string;
  /** Full name — used to generate initials (e.g. "Quốc Thanh" → "QT") */
  name?: string;
  /** Manual background color for initials/icon (hex, rgb, hsl) */
  color?: string;
  /** When `true`, auto-generate background color from `name` via `textToColor()`. Ignored if `color` is set. */
  autoColor?: boolean;
  /** Fallback icon when no `src` and no `name` are provided */
  fallbackIcon?: ReactNode;
  /** Avatar size (default: `'md'`) */
  size?: AvatarSize | number;
  /** Avatar shape (default: `'circular'`) */
  variant?: AvatarVariant;
  /** Show neutral border (useful for overlap in groups) */
  bordered?: boolean;
  /** Props passed directly to the internal `<img>` element */
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
}
