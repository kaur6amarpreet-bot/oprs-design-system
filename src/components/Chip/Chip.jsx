import React from 'react';

/**
 * KSRTC Chip
 * variant: 'filter' | 'assist' | 'badge' | 'success'
 *
 * Accessibility:
 * - Interactive chips use <button> (not <span role="button">) (WCAG 4.1.2)
 * - aria-pressed communicates selected state on filter chips (WCAG 4.1.2)
 * - Icons are aria-hidden (decorative) (WCAG 1.1.1)
 * - Non-interactive chips render as <span> (no role, not in tab order)
 */
export function Chip({
  variant = 'filter',
  selected = false,
  icon,
  trailingIcon,
  children,
  onClick,
  ...props
}) {
  const variantClass = {
    filter:  'chip-filter',
    assist:  'chip-assist',
    badge:   'chip-badge',
    success: 'chip-success',
  }[variant] || 'chip-filter';

  const classes = [
    variantClass,
    variant === 'filter' && selected ? 'selected' : '',
  ].filter(Boolean).join(' ');

  // Interactive chip — use <button> for full keyboard & AT support
  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-pressed={variant === 'filter' ? selected : undefined}
        {...props}
      >
        {icon && (
          <span className="material-symbols-outlined" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {trailingIcon && (
          <span className="material-symbols-outlined" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  }

  // Non-interactive chip — decorative display only
  return (
    <span className={classes} {...props}>
      {icon && (
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {trailingIcon && (
        <span className="material-symbols-outlined" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </span>
  );
}

export default Chip;
