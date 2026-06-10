import React from 'react';
import './RadioButton.css';

export function RadioButton({ label, helperText, checked, disabled, onChange, name, value, id }) {
  const rbId = id || `rb-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <div className={`ksrtc-radio${disabled ? ' ksrtc-radio--disabled' : ''}`}>
      <div className="ksrtc-radio__control">
        <input
          type="radio"
          id={rbId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="ksrtc-radio__input"
        />
        <div className="ksrtc-radio__ring" aria-hidden="true">
          <div className="ksrtc-radio__dot" />
        </div>
      </div>
      {label && (
        <label htmlFor={rbId} className="ksrtc-radio__label">
          {label}
          {helperText && <span className="ksrtc-radio__helper">{helperText}</span>}
        </label>
      )}
    </div>
  );
}

/**
 * RadioGroup accessibility:
 * - role="radiogroup" groups related radio buttons for AT (WCAG 1.3.1)
 * - aria-label or aria-labelledby is required so SR announces the group purpose (WCAG 4.1.2)
 *   Pass label="Seat type" or labelledBy="my-heading-id"
 */
export function RadioGroup({ name, options = [], value, onChange, direction = 'vertical', label, labelledBy }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-labelledby={labelledBy}
      style={{ display: 'flex', flexDirection: direction === 'horizontal' ? 'row' : 'column', gap: 12 }}
    >
      {options.map(opt => (
        <RadioButton
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          helperText={opt.helperText}
          checked={value === opt.value}
          disabled={opt.disabled}
          onChange={() => onChange?.(opt.value)}
        />
      ))}
    </div>
  );
}

export default RadioButton;
