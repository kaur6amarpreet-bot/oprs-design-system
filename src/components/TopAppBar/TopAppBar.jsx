import React from 'react';

/**
 * KSRTC TopAppBar
 *
 * Accessibility:
 * - Wrapped in <header> (landmark, WCAG 1.3.1)
 * - aria-label on <header> for multiple landmark disambiguation
 * - Leading button aria-label is dynamic (WCAG 4.1.2)
 * - Brand icon is aria-hidden; brand text provides the name (WCAG 1.1.1)
 * - Trailing icons should each have their own aria-label (enforced via usage guidance)
 */
export function TopAppBar({
  title = 'OPRS',
  subtitle,
  leadingIcon,
  leadingLabel,     // explicit label for leading button e.g. "Open menu", "Go back"
  trailingItems,
  onLeadingClick,
}) {
  return (
    <header className="top-app-bar" aria-label="Application header">
      {leadingIcon ? (
        <button
          className="icon-btn icon-btn-on-primary"
          onClick={onLeadingClick}
          type="button"
          aria-label={leadingLabel || 'Go back'}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {leadingIcon}
          </span>
        </button>
      ) : (
        <button
          className="icon-btn icon-btn-on-primary"
          onClick={onLeadingClick}
          type="button"
          aria-label={leadingLabel || 'Open navigation menu'}
        >
          <div className="brand-icon" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff' }}>
              directions_bus
            </span>
          </div>
        </button>
      )}
      <div style={{ flex: 1 }}>
        <div className="brand-text">{title}</div>
        {subtitle && (
          <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 400 }}>{subtitle}</div>
        )}
      </div>
      <div className="spacer" aria-hidden="true" />
      {trailingItems}
    </header>
  );
}

export default TopAppBar;
