import type { AvatarSize, AvatarVariant } from '../models';

/* ─── Size Map ─────────────────────────────────────────────── */
export const AVATAR_SIZE_MAP: Record<AvatarSize, { dimension: number; fontSize: number; borderWidth: number }> = {
  sm: { dimension: 28, fontSize: 12, borderWidth: 2 },
  md: { dimension: 40, fontSize: 16, borderWidth: 2 },
  lg: { dimension: 56, fontSize: 22, borderWidth: 3 },
};

/* ─── Default Values ───────────────────────────────────────── */
export const AVATAR_DEFAULTS = {
  size: 'md' as AvatarSize,
  variant: 'circular' as AvatarVariant,
} as const;
