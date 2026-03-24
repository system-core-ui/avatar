import { forwardRef, useState, useCallback } from 'react';
import { textToColor } from '@thanh-libs/utils';

import type { AvatarProps } from './models';
import { AVATAR_DEFAULTS } from './constants';
import { getInitials, getContrastText } from './helpers';
import { AvatarStyled, AvatarImgStyled, AvatarIconStyled } from './styled';

/** Default user icon (silhouette) */
const DefaultUserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

/**
 * Avatar — displays a user image, initials, or fallback icon.
 *
 * @example
 * ```tsx
 * <Avatar src="/photo.jpg" name="Quốc Thanh" />
 * <Avatar name="Alice Smith" autoColor />
 * <Avatar size="lg" variant="rounded" />
 * ```
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      color,
      autoColor = false,
      fallbackIcon,
      size = AVATAR_DEFAULTS.size,
      variant = AVATAR_DEFAULTS.variant,
      bordered = false,
      imgProps,
      className,
      ...rest
    },
    ref,
  ) => {
    const [imgError, setImgError] = useState(false);

    const handleError = useCallback(() => {
      setImgError(true);
    }, []);

    // Determine what to render
    const hasImage = !!src && !imgError;
    const initials = name ? getInitials(name) : '';
    const hasInitials = !hasImage && initials.length > 0;

    // Determine background color
    let bgColor: string | undefined;
    let textColor: string | undefined;

    if (hasInitials || (!hasImage && !initials)) {
      if (color) {
        bgColor = color;
        textColor = getContrastText(color);
      } else if (autoColor && name) {
        bgColor = textToColor(name);
        textColor = getContrastText(bgColor);
      }
    }

    // Accessibility
    const altText = alt || name || 'avatar';
    const ariaLabel = name || alt || undefined;

    return (
      <AvatarStyled
        ref={ref}
        ownerSize={size}
        ownerVariant={variant}
        ownerBgColor={bgColor}
        ownerTextColor={textColor}
        ownerBordered={bordered}
        className={className}
        role={hasImage ? undefined : 'img'}
        aria-label={hasImage ? undefined : ariaLabel}
        {...rest}
      >
        {hasImage && (
          <AvatarImgStyled
            src={src}
            alt={altText}
            onError={handleError}
            {...imgProps}
          />
        )}
        {hasInitials && !hasImage && initials}
        {!hasImage && !hasInitials && (
          <AvatarIconStyled aria-hidden="true">
            {fallbackIcon || <DefaultUserIcon />}
          </AvatarIconStyled>
        )}
      </AvatarStyled>
    );
  },
);

Avatar.displayName = 'Avatar';
