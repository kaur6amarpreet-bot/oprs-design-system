import React from 'react';
import './StatItem.css';

/**
 * KSRTC StatItem
 *
 * Compact metric display used in the search header bar (top-right area).
 * Shows a label above a value — e.g. "Ticket No." / "0" and "Available Credit" / "₹ 1,250.00"
 *
 * Props:
 *   label:   string
 *   value:   string | number
 *   prefix:  string (e.g. "₹")
 *   icon:    Material Symbol name (optional)
 *   variant: 'default' | 'currency' | 'highlight'
 */

export function StatItem({
  label,
  value,
  prefix,
  suffix,
  icon,
  variant = 'default',
  style,
}) {
  const display = prefix
    ? `${prefix} ${typeof value === 'number' ? value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value}`
    : suffix
    ? `${value}${suffix}`
    : value;

  return (
    <div className={`ksrtc-stat-item ksrtc-stat-item--${variant}`} style={style}>
      {icon && (
        <span className="material-symbols-outlined ksrtc-stat-item__icon">{icon}</span>
      )}
      <div className="ksrtc-stat-item__text">
        <span className="ksrtc-stat-item__label">{label}</span>
        <span className="ksrtc-stat-item__value">{display}</span>
      </div>
    </div>
  );
}

export function StatGroup({ children, style }) {
  return (
    <div className="ksrtc-stat-group" style={style}>
      {children}
    </div>
  );
}

export default StatItem;
