# @thanh-libs/avatar

Avatar component for System Core UI. Displays user images, auto-generated initials, or fallback icons. Styled with Emotion, themed via `@thanh-libs/theme`.

## Installation

```bash
npm install @thanh-libs/avatar
```

### Peer Dependencies

```json
{
  "@emotion/react": ">=11.0.0",
  "@emotion/styled": ">=11.0.0",
  "@thanh-libs/theme": "*",
  "@thanh-libs/utils": "*",
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

## Usage

```tsx
import { Avatar } from '@thanh-libs/avatar';

{/* Image avatar */}
<Avatar src="/photo.jpg" name="Quốc Thanh" />

{/* Initials — auto-generated from name */}
<Avatar name="Alice Smith" />

{/* Auto color — deterministic background from name */}
<Avatar name="John Doe" autoColor />

{/* Custom color */}
<Avatar name="Bob" color="#1890ff" />

{/* Sizes & variants */}
<Avatar name="A" size="sm" />
<Avatar name="B" size="lg" variant="rounded" />
<Avatar name="C" size={64} variant="square" />

{/* Fallback icon (no src, no name) */}
<Avatar />
<Avatar fallbackIcon={<CustomIcon />} />

{/* Bordered (useful for overlapping groups) */}
<Avatar src="/photo.jpg" bordered />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | URL of the avatar image |
| `alt` | `string` | `name \|\| 'avatar'` | Alt text for the image |
| `name` | `string` | — | Full name — generates initials (e.g. "Quốc Thanh" → "QT") |
| `color` | `string` | — | Manual background color (hex, rgb, hsl) |
| `autoColor` | `boolean` | `false` | Auto-generate background from `name` via `textToColor()` |
| `fallbackIcon` | `ReactNode` | User silhouette | Fallback icon when no `src` and no `name` |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | Avatar size |
| `variant` | `'circular' \| 'rounded' \| 'square'` | `'circular'` | Avatar shape |
| `bordered` | `boolean` | `false` | Show neutral border |
| `imgProps` | `ImgHTMLAttributes` | — | Props passed to the internal `<img>` |

> Also extends `HTMLAttributes<HTMLDivElement>` — supports `className`, `style`, `onClick`, etc.

## Running unit tests

```bash
nx test @thanh-libs/avatar
```
