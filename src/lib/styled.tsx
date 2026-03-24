import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import type { ThemeSchema } from '@thanh-libs/theme';
import { pxToRem } from '@thanh-libs/utils';
import type { AvatarSize, AvatarVariant } from './models';
import { AVATAR_SIZE_MAP } from './constants';

/* ─── Avatar Root ──────────────────────────────────────────── */
export const AvatarStyled = styled.div<{
  ownerSize: AvatarSize | number;
  ownerVariant: AvatarVariant;
  ownerBgColor?: string;
  ownerTextColor?: string;
  ownerBordered: boolean;
}>(({ ownerSize, ownerVariant, ownerBgColor, ownerTextColor, ownerBordered }) => {
  const theme = useTheme() as ThemeSchema;

  const isPreset = typeof ownerSize === 'string';
  const sizeConfig = isPreset ? AVATAR_SIZE_MAP[ownerSize] : null;
  const dimension = sizeConfig ? sizeConfig.dimension : (ownerSize as number);
  const fontSize = sizeConfig ? sizeConfig.fontSize : Math.round((ownerSize as number) * 0.4);
  const borderWidth = sizeConfig ? sizeConfig.borderWidth : Math.max(2, Math.round((ownerSize as number) * 0.05));

  const borderRadiusMap: Record<AvatarVariant, string> = {
    circular: '50%',
    rounded: pxToRem(Math.round(dimension * 0.2)),
    square: '0',
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: pxToRem(dimension),
    height: pxToRem(dimension),
    borderRadius: borderRadiusMap[ownerVariant],
    backgroundColor: ownerBgColor ?? theme.palette?.action?.hover ?? '#e0e0e0',
    color: ownerTextColor ?? theme.palette?.text?.primary ?? '#616161',
    fontSize: pxToRem(fontSize),
    fontFamily: theme.typography?.fontFamily ?? 'inherit',
    fontWeight: 600,
    lineHeight: 1,
    overflow: 'hidden',
    userSelect: 'none' as const,
    position: 'relative' as const,
    boxSizing: 'border-box' as const,

    ...(ownerBordered && {
      border: `${pxToRem(borderWidth)} solid ${theme.palette?.background?.default ?? '#fff'}`,
    }),
  };
});

/* ─── Avatar Image ─────────────────────────────────────────── */
export const AvatarImgStyled = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  display: 'block',
});

/* ─── Fallback Icon Wrapper ────────────────────────────────── */
export const AvatarIconStyled = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60%',
  height: '60%',
  '& > svg': {
    width: '100%',
    height: '100%',
  },
});
