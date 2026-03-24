import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar';
import type { AvatarSize, AvatarVariant } from '../models';

// ─── Row helper ──────────────────────────────────────────

const Row = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>}
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
  </div>
);

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="image avatar">
      <Avatar src="https://i.pravatar.cc/80?img=1" name="John Doe" />
    </Row>
    <Row label="initials avatar">
      <Avatar name="Quốc Thanh" autoColor />
    </Row>
    <Row label="fallback (no src, no name)">
      <Avatar />
    </Row>
  </div>
);

// ─── Variants ────────────────────────────────────────────

const VariantsStory = () => (
  <div style={{ padding: 32 }}>
    {(['circular', 'rounded', 'square'] as AvatarVariant[]).map((v) => (
      <Row key={v} label={v}>
        <Avatar variant={v} src="https://i.pravatar.cc/80?img=3" name="User" />
        <Avatar variant={v} name="Alice Bob" autoColor />
        <Avatar variant={v} />
      </Row>
    ))}
  </div>
);

// ─── Sizes ───────────────────────────────────────────────

const SizesStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="preset sizes">
      {(['sm', 'md', 'lg'] as AvatarSize[]).map((s) => (
        <Avatar key={s} size={s} name="Quốc Thanh" autoColor />
      ))}
    </Row>
    <Row label="custom number sizes">
      {[24, 48, 72, 96].map((s) => (
        <Avatar key={s} size={s} name="Custom" autoColor />
      ))}
    </Row>
    <Row label="image sizes">
      {(['sm', 'md', 'lg'] as AvatarSize[]).map((s) => (
        <Avatar key={s} size={s} src="https://i.pravatar.cc/80?img=5" name="User" />
      ))}
    </Row>
  </div>
);

// ─── Initials with AutoColor ─────────────────────────────

const InitialsStory = () => {
  const names = [
    'Quốc Thanh', 'Alice Smith', 'Bob Johnson', 'Charlie Brown',
    'Diana Prince', 'Eve Wilson', 'Frank Castle', 'Grace Hopper',
  ];

  return (
    <div style={{ padding: 32 }}>
      <Row label="auto-color from name">
        {names.map((name) => (
          <Avatar key={name} name={name} autoColor />
        ))}
      </Row>
      <Row label="manual color">
        <Avatar name="Red User" color="#e53e3e" />
        <Avatar name="Blue User" color="#3182ce" />
        <Avatar name="Green User" color="#38a169" />
        <Avatar name="Purple User" color="#805ad5" />
      </Row>
      <Row label="no color (theme default)">
        {names.slice(0, 4).map((name) => (
          <Avatar key={name} name={name} />
        ))}
      </Row>
    </div>
  );
};

// ─── Fallback ────────────────────────────────────────────

const CustomIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

const FallbackStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="default fallback icon">
      <Avatar />
      <Avatar size="lg" />
    </Row>
    <Row label="custom fallback icon">
      <Avatar fallbackIcon={<CustomIcon />} />
      <Avatar fallbackIcon={<CustomIcon />} size="lg" />
    </Row>
    <Row label="image error → fallback to initials">
      <Avatar src="https://broken-url.invalid/photo.jpg" name="Broken Image" autoColor />
    </Row>
    <Row label="image error → fallback to icon">
      <Avatar src="https://broken-url.invalid/photo.jpg" />
    </Row>
  </div>
);

// ─── Bordered ────────────────────────────────────────────

const BorderedStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="bordered (for overlap/groups)">
      <div style={{ display: 'flex' }}>
        {['Alice', 'Bob', 'Charlie', 'Diana'].map((name, i) => (
          <div key={name} style={{ marginLeft: i > 0 ? -12 : 0, zIndex: 4 - i }}>
            <Avatar name={name} autoColor bordered />
          </div>
        ))}
      </div>
    </Row>
    <Row label="bordered images">
      <div style={{ display: 'flex' }}>
        {[1, 2, 3, 4].map((img, i) => (
          <div key={img} style={{ marginLeft: i > 0 ? -12 : 0, zIndex: 4 - i }}>
            <Avatar src={`https://i.pravatar.cc/80?img=${img}`} bordered />
          </div>
        ))}
      </div>
    </Row>
  </div>
);

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: {
  size: AvatarSize;
  variant: AvatarVariant;
  bordered: boolean;
  autoColor: boolean;
  name: string;
  color: string;
  src: string;
}) => (
  <div style={{ padding: 32 }}>
    <Avatar
      size={args.size}
      variant={args.variant}
      bordered={args.bordered}
      autoColor={args.autoColor}
      name={args.name || undefined}
      color={args.color || undefined}
      src={args.src || undefined}
    />
  </div>
);

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Avatar/Avatar',
};

export default meta;

export const Basic: StoryObj = { name: 'Basic', render: () => <BasicStory /> };
export const Variants: StoryObj = { name: 'Variants', render: () => <VariantsStory /> };
export const Sizes: StoryObj = { name: 'Sizes', render: () => <SizesStory /> };
export const Initials: StoryObj = { name: 'Initials & Colors', render: () => <InitialsStory /> };
export const Fallback: StoryObj = { name: 'Fallback', render: () => <FallbackStory /> };
export const Bordered: StoryObj = { name: 'Bordered', render: () => <BorderedStory /> };

export const Playground: StoryObj = {
  name: 'Playground',
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'select' }, options: ['circular', 'rounded', 'square'] },
    bordered: { control: 'boolean' },
    autoColor: { control: 'boolean' },
    name: { control: 'text' },
    color: { control: 'color' },
    src: { control: 'text' },
  },
  args: {
    size: 'md',
    variant: 'circular',
    bordered: false,
    autoColor: true,
    name: 'Quốc Thanh',
    color: '',
    src: '',
  },
  render: (args: any) => <PlaygroundStory {...args} />,
};
