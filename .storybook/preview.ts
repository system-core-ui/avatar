import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@thanh-libs/theme';
import { createElement } from 'react';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
  },
  globalTypes: {
    themeMode: {
      description: 'Theme mode',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    themeMode: 'light',
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.themeMode || 'light';
      return createElement(ThemeProvider, { defaultMode: mode }, createElement(Story));
    },
  ],
};

export default preview;
