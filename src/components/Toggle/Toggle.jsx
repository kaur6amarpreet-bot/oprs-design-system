import React from 'react';
import './Toggle.css';

/**
 * KSRTC Toggle (MD3 Switch)
 * checked: boolean
 * onChange: (e) => void
 *
 * Accessibility:
 * - role="switch" on input communicates on/off semantics (WCAG 4.1.2)
 * - aria-checked is redundant on a native checkbox — removed (native checked handles it)
 * - aria-label fallback when no label text is provided (WCAG 4.1.2)
 * - The visual track/thumb is aria-hidden (WCAG 1.1.1)
 */
export function Toggle({ checked = false, disabled = false, label, ariaLabel, onChange, id }) {
  const tId = id || `toggle-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <div className={`ksrtc-toggle${disabled ? ' ksrtc-toggle--disabled' : ''}`}>
      <div className="ksrtc-toggle__track">
        <input
          type="checkbox"
          id={tId}
          role="switch"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="ksrtc-toggle__input"
          aria-label={!label ? ariaLabel : undefined}
        />
        <div className="ksrtc-toggle__track-bg" aria-hidden="true">
          <div className="ksrtc-toggle__thumb">
            {checked && (
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 12, color: 'var(--color-primary)' }}
                aria-hidden="true"
              >
                check
              </span>
            )}
          </div>
        </div>
      </div>
      {label && (
        <label htmlFor={tId} className="ksrtc-toggle__label">
          {label}
        </label>
      )}
    </div>
  );
}

export default Toggle;
