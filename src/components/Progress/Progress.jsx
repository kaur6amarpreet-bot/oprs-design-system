import React from 'react';
import './Progress.css';

/**
 * LinearProgress
 * value: 0–100, or undefined for indeterminate
 */
export function LinearProgress({ value, label }) {
  const isIndeterminate = value === undefined;
  return (
    <div
      role="progressbar"
      aria-valuenow={!isIndeterminate ? value : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || 'Loading'}
      className="ksrtc-linear-progress"
    >
      <div
        className={`ksrtc-linear-progress__track${isIndeterminate ? ' ksrtc-linear-progress__track--indeterminate' : ''}`}
        style={!isIndeterminate ? { width: `${value}%` } : {}}
      />
    </div>
  );
}

/**
 * CircularProgress
 * value: 0–100, or undefined for indeterminate
 * size: 'sm' | 'md' | 'lg'
 */
export function CircularProgress({ value, size = 'md', label }) {
  const isIndeterminate = value === undefined;
  const sizePx = { sm: 24, md: 40, lg: 56 }[size] || 40;
  const stroke  = sizePx * 0.1;
  const r       = (sizePx - stroke) / 2;
  const circ    = 2 * Math.PI * r;
  const dash    = isIndeterminate ? circ * 0.75 : (circ * (value / 100));

  return (
    <svg
      className={`ksrtc-circular-progress${isIndeterminate ? ' ksrtc-circular-progress--spin' : ''}`}
      width={sizePx}
      height={sizePx}
      viewBox={`0 0 ${sizePx} ${sizePx}`}
      role="progressbar"
      aria-valuenow={!isIndeterminate ? value : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || 'Loading'}
    >
      <circle
        cx={sizePx / 2}
        cy={sizePx / 2}
        r={r}
        fill="none"
        stroke="var(--color-surface-container-high)"
        strokeWidth={stroke}
      />
      <circle
        cx={sizePx / 2}
        cy={sizePx / 2}
        r={r}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ - dash}
        strokeLinecap="round"
        transform={`rotate(-90 ${sizePx / 2} ${sizePx / 2})`}
      />
    </svg>
  );
}
