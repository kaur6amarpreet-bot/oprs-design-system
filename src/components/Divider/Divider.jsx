import React from 'react';

/**
 * KSRTC Divider
 * orientation: 'horizontal' | 'vertical'
 * variant: 'full' | 'inset' | 'middle'
 */
export function Divider({ orientation = 'horizontal', variant = 'full', style }) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        style={{
          width: 1,
          background: 'var(--color-outline-variant)',
          alignSelf: 'stretch',
          ...style,
        }}
      />
    );
  }
  const marginMap = {
    full:   '0',
    inset:  '0 0 0 var(--space-4)',
    middle: '0 var(--space-4)',
  };
  return (
    <hr
      role="separator"
      style={{
        border: 'none',
        borderTop: '1px solid var(--color-outline-variant)',
        margin: marginMap[variant] || '0',
        ...style,
      }}
    />
  );
}

export default Divider;
