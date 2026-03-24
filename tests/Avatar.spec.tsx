import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@thanh-libs/theme';
import { Avatar } from '../src';

/** Helper to render with theme */
const renderAvatar = (props: Record<string, unknown> = {}) =>
  render(
    <ThemeProvider>
      <Avatar {...props} />
    </ThemeProvider>,
  );

describe('<Avatar />', () => {
  // ─── Image rendering ──────────────────────────────────

  describe('image mode', () => {
    it('renders an img when src is provided', () => {
      renderAvatar({ src: 'https://example.com/photo.jpg', name: 'Thanh' });
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img.tagName).toBe('IMG');
      expect(img.src).toBe('https://example.com/photo.jpg');
    });

    it('uses name as alt text when alt is not provided', () => {
      renderAvatar({ src: 'https://example.com/photo.jpg', name: 'Thanh' });
      expect(screen.getByAltText('Thanh')).toBeTruthy();
    });

    it('uses provided alt text over name', () => {
      renderAvatar({ src: 'https://example.com/photo.jpg', name: 'Thanh', alt: 'Custom alt' });
      expect(screen.getByAltText('Custom alt')).toBeTruthy();
    });

    it('falls back to initials when image fails to load', () => {
      renderAvatar({ src: 'https://broken.invalid/photo.jpg', name: 'Quốc Thanh' });
      const img = screen.getByRole('img') as HTMLImageElement;
      fireEvent.error(img);
      expect(screen.getByText('QT')).toBeTruthy();
    });
  });

  // ─── Initials rendering ────────────────────────────────

  describe('initials mode', () => {
    it('renders initials when name is provided without src', () => {
      renderAvatar({ name: 'Alice Smith' });
      expect(screen.getByText('AS')).toBeTruthy();
    });

    it('applies role="img" when showing initials', () => {
      renderAvatar({ name: 'Alice Smith' });
      const el = screen.getByRole('img');
      expect(el.textContent).toBe('AS');
    });

    it('sets aria-label from name', () => {
      renderAvatar({ name: 'Alice Smith' });
      expect(screen.getByLabelText('Alice Smith')).toBeTruthy();
    });
  });

  // ─── Fallback icon rendering ───────────────────────────

  describe('fallback icon mode', () => {
    it('renders default user icon when no src and no name', () => {
      renderAvatar();
      const el = screen.getByRole('img');
      const svg = el.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('renders custom fallback icon', () => {
      const customIcon = <span data-testid="custom-icon">★</span>;
      renderAvatar({ fallbackIcon: customIcon });
      expect(screen.getByTestId('custom-icon')).toBeTruthy();
    });
  });

  // ─── autoColor ─────────────────────────────────────────

  describe('autoColor', () => {
    it('generates different styles for autoColor vs no autoColor', () => {
      const { container: withAuto } = renderAvatar({ name: 'Alice', autoColor: true });
      const { container: withoutAuto } = renderAvatar({ name: 'Alice', autoColor: false });
      const rootAuto = withAuto.firstElementChild as HTMLElement;
      const rootNoAuto = withoutAuto.firstElementChild as HTMLElement;
      // Emotion generates different class names for different styles
      expect(rootAuto.className).not.toBe(rootNoAuto.className);
    });

    it('color prop produces different class than autoColor', () => {
      const { container: withColor } = renderAvatar({ name: 'Alice', color: '#ff0000', autoColor: true });
      const { container: withAutoOnly } = renderAvatar({ name: 'Alice', autoColor: true });
      const rootColor = withColor.firstElementChild as HTMLElement;
      const rootAuto = withAutoOnly.firstElementChild as HTMLElement;
      expect(rootColor.className).not.toBe(rootAuto.className);
    });

    it('renders without errors when autoColor is true', () => {
      expect(() => renderAvatar({ name: 'Alice', autoColor: true })).not.toThrow();
    });

    it('renders without errors when color is provided', () => {
      expect(() => renderAvatar({ name: 'Alice', color: '#ff0000' })).not.toThrow();
    });
  });

  // ─── Sizes ─────────────────────────────────────────────

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders without errors at size %s', (size) => {
      expect(() => renderAvatar({ name: 'A', size })).not.toThrow();
    });

    it('renders without errors with custom numeric size', () => {
      expect(() => renderAvatar({ name: 'A', size: 100 })).not.toThrow();
    });

    it('different sizes produce different class names', () => {
      const { container: sm } = renderAvatar({ name: 'A', size: 'sm' });
      const { container: lg } = renderAvatar({ name: 'A', size: 'lg' });
      const rootSm = sm.firstElementChild as HTMLElement;
      const rootLg = lg.firstElementChild as HTMLElement;
      expect(rootSm.className).not.toBe(rootLg.className);
    });
  });

  // ─── Variants ──────────────────────────────────────────

  describe('variants', () => {
    it.each(['circular', 'rounded', 'square'] as const)('renders without errors with variant %s', (variant) => {
      expect(() => renderAvatar({ name: 'A', variant })).not.toThrow();
    });

    it('different variants produce different class names', () => {
      const { container: circular } = renderAvatar({ name: 'A', variant: 'circular' });
      const { container: square } = renderAvatar({ name: 'A', variant: 'square' });
      const rootCircular = circular.firstElementChild as HTMLElement;
      const rootSquare = square.firstElementChild as HTMLElement;
      expect(rootCircular.className).not.toBe(rootSquare.className);
    });
  });

  // ─── Ref forwarding ────────────────────────────────────

  describe('ref forwarding', () => {
    it('forwards ref to the root div', () => {
      const ref = vi.fn();
      render(
        <ThemeProvider>
          <Avatar ref={ref} name="Test" />
        </ThemeProvider>,
      );
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });
  });
});
