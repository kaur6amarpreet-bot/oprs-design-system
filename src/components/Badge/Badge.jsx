import React from 'react';
import './Badge.css';

/**
 * KSRTC Badge — notification dot or count overlay on an icon.
 * variant: 'dot' | 'count'
 * Wrap your icon element as children; Badge overlays top-right.
 *
 * Accessibility:
 * - Count badges use aria-label to provide context (e.g. "3 notifications") (WCAG 1.1.1)
 * - Dot badges use aria-label "New notification" when no count is available
 * - The visual badge span is aria-hidden; the accessible text is on the wrapper
 *   so screen readers don't announce the count twice
 */
export function Badge({
  count,
  variant = 'count',
  max = 99,
  children,
  label,        // override the auto-generated accessible label
}) {
  const display = count !== undefined && count > max ? `${max}+` : count;

  // Build a descriptive label for screen readers
  const accessibleLabel = label
    || (variant === 'dot' ? 'New notification' : `${display} notification${display !== 1 ? 's' : ''}`);

  const hasBadge = variant === 'dot' || count !== undefined;

  return (
    <div
      className="ksrtc-badge-wrap"
      aria-label={hasBadge ? accessibleLabel : undefined}
    >
      {children}
      {hasBadge && (
        <span
          className={`ksrtc-badge${variant === 'dot' ? ' ksrtc-badge--dot' : ''}`}
          aria-hidden="true"
        >
          {variant !== 'dot' && display}
        </span>
      )}
    </div>
  );
}

export default Badge;
