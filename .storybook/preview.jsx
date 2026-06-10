import React from 'react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../tokens.css';
import '../dark-tokens.css';
import '../components.css';
import './storybook-globals.css';
import { oprsTheme, oprsDarkTheme } from './theme';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    docs: {
      theme: oprsTheme,
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h2, h3',
        title: 'On this page',
      },
      // Show clean JSX source in the "Show code" toggle for every story
      source: {
        type: 'dynamic',
        language: 'jsx',
        excludeDecorators: true,
      },
      canvas: { sourceState: 'hidden' }, // code collapsed by default — click "Show code" to expand
    },

    backgrounds: {
      disable: true, // themes addon handles backgrounds
    },

    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (360)',
          styles: { width: '360px', height: '780px' },
          type: 'mobile',
        },
        mobileL: {
          name: 'Mobile L (414)',
          styles: { width: '414px', height: '896px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet (768)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        laptop: {
          name: 'Laptop (1280)',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
        desktop: {
          name: 'Desktop (1440)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'laptop',
    },

    controls: {
      matchers: {
        color: /(background|color|bg|fill)$/i,
        date:  /Date$/i,
      },
      expanded: false,
      sort: 'requiredFirst',
    },

    options: {
      storySort: {
        order: [
          'Introduction',
          'Design Tokens',
          'Components',
          'OPRS Specific',
        ],
      },
    },

    a11y: {
      element: '#storybook-root',
      manual: false,
    },
  },

  decorators: [
    // ── Theme switcher — light / dark ──────────────────
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark:  'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),

    // ── Density switcher ───────────────────────────────
    (Story, context) => {
      const density = context.globals?.density || 'comfortable';
      return (
        <div data-density={density} style={{ fontFamily: "'Roboto', sans-serif" }}>
          <Story />
        </div>
      );
    },
  ],

  globalTypes: {
    density: {
      description: 'UI density',
      defaultValue: 'comfortable',
      toolbar: {
        title: 'Density',
        icon:  'dashboard',
        items: [
          { value: 'compact',     title: 'Compact',     icon: 'listunordered' },
          { value: 'comfortable', title: 'Comfortable', icon: 'component' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
