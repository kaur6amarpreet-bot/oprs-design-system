import React from 'react';
import './EmptyState.css';

/**
 * KSRTC EmptyState
 * Used for: no buses found, no booking history, no results after filtering.
 */
export function EmptyState({
  icon = 'search_off',
  title = 'No Results Found',
  description,
  action,
}) {
  return (
    <div className="ksrtc-empty-state">
      <span className="material-symbols-outlined ksrtc-empty-state__icon">{icon}</span>
      <h3 className="ksrtc-empty-state__title">{title}</h3>
      {description && <p className="ksrtc-empty-state__desc">{description}</p>}
      {action && <div className="ksrtc-empty-state__action">{action}</div>}
    </div>
  );
}

export default EmptyState;
