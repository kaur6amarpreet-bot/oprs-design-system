import React from 'react';

/**
 * KSRTC Button — wraps all MD3 button variants in one component.
 *
 * variant: 'filled' | 'filled-secondary' | 'filled-success'
 *          | 'tonal' | 'outlined' | 'text' | 'icon' | 'fab'
 * size:    'default' | 'sm'
 *
 * Accessibility:
 * - All icon spans are aria-hidden (icons are decorative; label is the text) (WCAG 1.1.1)
 * - icon-only buttons (variant="icon", variant="fab") MUST receive aria-label (WCAG 4.1.2)
 * - disabled attribute removes button from tab order natively (WCAG 2.1.1)
 */
export function Button({
  variant = 'filled',
  size = 'default',
  icon,
  iconPosition = 'start',
  children,
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) {
  const variantClass = {
    'filled':           'btn-filled',
    'filled-secondary': 'btn-filled-secondary',
    'filled-success':   'btn-filled-success',
    'tonal':            'btn-tonal',
    'outlined':         'btn-outlined',
    'text':             'btn-text',
  }[variant] || 'btn-filled';

  if (variant === 'icon') {
    return (
      <button
        className="icon-btn"
        disabled={disabled}
        onClick={onClick}
        type={type}
        aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
        style={fullWidth ? { width: '100%' } : {}}
        {...props}
      >
        {icon && (
          <span className="material-symbols-outlined" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }

  if (variant === 'fab') {
    return (
      <button
        className="fab"
        disabled={disabled}
        onClick={onClick}
        type={type}
        aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
        {...props}
      >
        {icon && (
          <span className="material-symbols-outlined" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }

  const classes = [
    'btn',
    variantClass,
    size === 'sm' ? 'btn-sm' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={fullWidth ? { width: '100%' } : {}}
      {...props}
    >
      {icon && iconPosition === 'start' && (
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'end' && (
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}

export default Button;
