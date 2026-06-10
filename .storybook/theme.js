import { create } from '@storybook/theming/create';

/* ── Light theme ───────────────────────────────────────── */
export const oprsTheme = create({
  base: 'light',

  brandTitle: 'OPRS Design System',
  brandUrl:   '/',
  brandTarget: '_self',

  colorPrimary:   '#1A56A0',
  colorSecondary: '#D84315',

  appBg:           '#0D3370',
  appContentBg:    '#FFFFFF',
  appPreviewBg:    '#FFFFFF',
  appBorderColor:  '#E2E8F3',
  appBorderRadius: 8,

  textColor:          '#FFFFFF',
  textInverseColor:   '#1A1C1E',
  textMutedColor:     'rgba(255,255,255,0.55)',

  barTextColor:         '#FFFFFF',
  barHoverColor:        '#FFFFFF',
  barSelectedColor:     '#A8C8FF',
  barBg:                '#0D3370',

  inputBg:            '#FFFFFF',
  inputBorder:        '#C4C6D0',
  inputTextColor:     '#1A1C1E',
  inputBorderRadius:  4,

  fontBase: '"Roboto", -apple-system, sans-serif',
  fontCode: '"Roboto Mono", "Fira Code", monospace',
});

/* ── Dark theme ────────────────────────────────────────── */
export const oprsDarkTheme = create({
  base: 'dark',

  brandTitle: 'OPRS Design System',
  brandUrl:   '/',
  brandTarget: '_self',

  colorPrimary:   '#A8C8FF',
  colorSecondary: '#FFAB8D',

  appBg:           '#0D1829',
  appContentBg:    '#121316',
  appPreviewBg:    '#1A1C1F',
  appBorderColor:  '#2E3034',
  appBorderRadius: 8,

  textColor:          '#E3E2E6',
  textInverseColor:   '#1A1C1E',
  textMutedColor:     'rgba(227,226,230,0.5)',

  barTextColor:         '#C4C6D0',
  barHoverColor:        '#E3E2E6',
  barSelectedColor:     '#A8C8FF',
  barBg:                '#0D1829',

  inputBg:            '#1E2023',
  inputBorder:        '#44464F',
  inputTextColor:     '#E3E2E6',
  inputBorderRadius:  4,

  fontBase: '"Roboto", -apple-system, sans-serif',
  fontCode: '"Roboto Mono", "Fira Code", monospace',
});

export default oprsTheme;
