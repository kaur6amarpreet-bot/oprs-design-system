/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/Introduction.stories.jsx',
    '../src/tokens/**/*.stories.@(js|jsx)',
    '../src/components/**/*.stories.@(js|jsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  viteFinal: (config) => {
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = config.optimizeDeps.include || [];
    return config;
  },
};
export default config;
