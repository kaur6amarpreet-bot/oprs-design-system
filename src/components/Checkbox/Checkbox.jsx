import React from 'react';
import './Checkbox.css';

/**
 * KSRTC Checkbox
 * state: 'default' | 'indeterminate' | 'disabled'
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  label,
  helperText,
  disabled = false,
  onChange,
  id,
  ...props
}) {
  const cbId = id || `cb-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div className={`ksrtc-checkbox${disabled ? ' ksrtc-checkbox--disabled' : ''}`}>
      <div className="ksrtc-checkbox__control">
        <input
          type="checkbox"
          id={cbId}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={(el) => { if (el) el.indeterminate = indeterminate; }}
          className="ksrtc-checkbox__input"
          {...props}
        />
        <div className="ksrtc-checkbox__box" aria-hidden="true">
          {indeterminate ? (
            <span className="material-symbols-outlined ksrtc-checkbox__icon">remove</span>
          ) : checked ? (
            <span className="material-symbols-outlined ksrtc-checkbox__icon">check</span>
          ) : null}
        </div>
      </div>
      {label && (
        <label htmlFor={cbId} className="ksrtc-checkbox__label">
          {label}
          {helperText && <span className="ksrtc-checkbox__helper">{helperText}</span>}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
