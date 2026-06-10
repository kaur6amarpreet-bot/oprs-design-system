import React, { useState, useRef } from 'react';
import './TextField.css';

/**
 * KSRTC TextField
 *
 * variant:  'outlined' | 'filled' | 'search'
 * size:     'sm' | 'md' | 'lg'
 * state:    'default' | 'error' | 'disabled' | 'readonly'
 * type:     'text' | 'email' | 'tel' | 'number' | 'password' | 'search' | 'textarea'
 */
export function TextField({
  // Content
  label,
  placeholder,
  value,
  defaultValue,
  helperText,
  errorText,
  prefix,
  suffix,

  // Icons
  leadingIcon,
  trailingIcon,
  clearable = false,

  // State
  state      = 'default',
  required   = false,
  maxLength,
  showCount  = false,

  // Appearance
  variant    = 'outlined',
  size       = 'md',
  type       = 'text',
  rows       = 3,
  fullWidth  = false,

  // Events
  onChange,
  onClear,

  // HTML
  id,
  name,
  autoComplete,
  autoFocus,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [showPassword, setShowPassword]   = useState(false);
  const inputRef = useRef(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const charCount    = (currentValue || '').length;

  const isError    = state === 'error';
  const isDisabled = state === 'disabled';
  const isReadonly = state === 'readonly';

  const fieldId = id || `ksrtc-field-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2, 6)}`;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onClear?.();
    inputRef.current?.focus();
  };

  // Resolve the actual input type (password toggle)
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  // Determine trailing action button
  const hasTrailingAction =
    (clearable && currentValue?.length > 0) || type === 'password';

  // Compute class modifiers
  const modifiers = [
    `ksrtc-field--${size}`,
    `ksrtc-field--${variant}`,
    isError    && 'ksrtc-field--error',
    isDisabled && 'ksrtc-field--disabled',
    isReadonly && 'ksrtc-field--readonly',
    leadingIcon && 'ksrtc-field--has-leading',
    (trailingIcon || hasTrailingAction || suffix) && 'ksrtc-field--has-trailing',
    prefix && 'ksrtc-field--has-prefix',
    suffix && 'ksrtc-field--has-suffix',
    fullWidth && 'ksrtc-field--full-width',
  ].filter(Boolean).join(' ');

  const supportText = isError ? errorText : helperText;

  return (
    <div
      className={`ksrtc-field ${modifiers}`}
      style={fullWidth ? { width: '100%' } : {}}
    >
      {/* Label */}
      {label && (
        <label className="ksrtc-field__label" htmlFor={fieldId}>
          {label}{required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="ksrtc-field__wrap">

        {/* Leading icon — decorative, aria-hidden */}
        {leadingIcon && (
          <span
            className="ksrtc-field__icon ksrtc-field__icon--leading material-symbols-outlined"
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}

        {/* Prefix text */}
        {prefix && !leadingIcon && (
          <span className="ksrtc-field__prefix">{prefix}</span>
        )}

        {/* Input / Textarea */}
        {type === 'textarea' ? (
          <textarea
            ref={inputRef}
            id={fieldId}
            name={name}
            className="ksrtc-field__input ksrtc-field__input--textarea"
            placeholder={placeholder}
            value={isControlled ? value : internalValue}
            onChange={handleChange}
            disabled={isDisabled}
            readOnly={isReadonly}
            required={required}
            maxLength={maxLength}
            rows={rows}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            aria-invalid={isError}
            aria-describedby={supportText ? `${fieldId}-support` : undefined}
            {...props}
          />
        ) : (
          <input
            ref={inputRef}
            id={fieldId}
            name={name}
            type={inputType}
            className="ksrtc-field__input"
            placeholder={placeholder}
            value={isControlled ? value : internalValue}
            onChange={handleChange}
            disabled={isDisabled}
            readOnly={isReadonly}
            required={required}
            maxLength={maxLength}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            aria-invalid={isError}
            aria-describedby={supportText ? `${fieldId}-support` : undefined}
            {...props}
          />
        )}

        {/* Suffix text */}
        {suffix && !trailingIcon && !hasTrailingAction && (
          <span className="ksrtc-field__suffix">{suffix}</span>
        )}

        {/* Static trailing icon — decorative */}
        {trailingIcon && !hasTrailingAction && (
          <span
            className="ksrtc-field__icon ksrtc-field__icon--trailing material-symbols-outlined"
            aria-hidden="true"
          >
            {isError ? 'error' : trailingIcon}
          </span>
        )}

        {/* Error icon — decorative; error message is announced via role="alert" on support text */}
        {isError && !trailingIcon && !hasTrailingAction && (
          <span
            className="ksrtc-field__icon ksrtc-field__icon--trailing material-symbols-outlined"
            aria-hidden="true"
          >
            error
          </span>
        )}

        {/* Clearable button — in tab order so keyboard users can clear (WCAG 2.1.1) */}
        {clearable && currentValue?.length > 0 && !isDisabled && !isReadonly && (
          <button
            type="button"
            className="ksrtc-field__icon-btn"
            onClick={handleClear}
            aria-label="Clear input"
          >
            <span className="material-symbols-outlined" aria-hidden="true">cancel</span>
          </button>
        )}

        {/* Password toggle — in tab order so keyboard users can reveal password (WCAG 2.1.1) */}
        {type === 'password' && !isDisabled && (
          <button
            type="button"
            className="ksrtc-field__icon-btn"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>

      {/* Helper text + char count */}
      {(supportText || (showCount && maxLength)) && (
        <div className="ksrtc-field__support" id={`${fieldId}-support`} role={isError ? 'alert' : undefined}>
          {supportText && (
            <span className="ksrtc-field__helper">
              {isError && (
                <span className="material-symbols-outlined" style={{ fontSize: 12, verticalAlign: 'middle', marginRight: 3 }}>
                  error
                </span>
              )}
              {supportText}
            </span>
          )}
          {showCount && maxLength && (
            <span className={`ksrtc-field__charcount${charCount > maxLength ? ' ksrtc-field__charcount--over' : ''}`}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default TextField;
