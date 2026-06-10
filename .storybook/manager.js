import { addons } from '@storybook/manager-api';
import { oprsTheme, oprsDarkTheme } from './theme';

addons.setConfig({
  theme: oprsTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  toolbar: {
    zoom:       { hidden: false },
    eject:      { hidden: true  },
    copy:       { hidden: false },
    fullscreen: { hidden: false },
  },
  enableShortcuts: true,
  isFullscreen:    false,
  showNav:         true,
  showPanel:       true,
  panelPosition:   'bottom',
  initialActive:   'sidebar',
});

// Switch the manager theme (sidebar + panels) when the
// toolbar theme global changes to 'dark' / 'light'.
addons.register('oprs/theme-sync', (api) => {
  const applyManagerTheme = (globals) => {
    const isDark = globals?.theme === 'dark';
    addons.setConfig({ theme: isDark ? oprsDarkTheme : oprsTheme });
    // Trigger a re-render of the manager by forcing a re-paint
    document.documentElement.setAttribute('data-manager-theme', isDark ? 'dark' : 'light');
  };

  // Listen for globals changes
  const channel = addons.getChannel();
  channel.on('GLOBALS_UPDATED', ({ globals }) => applyManagerTheme(globals));
  channel.on('SET_GLOBALS',     ({ globals }) => applyManagerTheme(globals));
});
