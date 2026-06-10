import React, { useState, useRef, useEffect, useId } from 'react';
import './Select.css';

/**
 * KSRTC Select
 *
 * options: string[] | { value, label, icon?, disabled?, group? }[]
 * variant: 'outlined' | 'filled'
 * size: 'sm' | 'md' | 'lg'
 * state: 'default' | 'error' | 'disabled'
 * searchable: boolean — filter list by typing
 * clearable: boolean — show × when value is set
 */
export function Select({
  label,
  placeholder = 'Select an option',
  options = [],
  value,
  defaultValue,
  onChange,
  variant = 'outlined',
  size = 'md',
  state = 'default',
  required = false,
  searchable = false,
  clearable = false,
  helperText,
  errorText,
  leadingIcon,
  fullWidth = false,
  id,
  name,
  ...props
}) {
  const uid = useId();
  const selectId = id || uid;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const currentValue = isControlled ? value : internalValue;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focusedIdx, setFocusedIdx] = useState(-1);

  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const searchRef = useRef(null);

  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const supportText = isError ? errorText : helperText;

  // Normalise options to objects
  const normOpts = options.map(o =>
    typeof o === 'string' ? { value: o, label: o } : o
  );

  // Filter when searching
  const filteredOpts = search
    ? normOpts.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : normOpts;

  // Group opts if any have a group property
  const hasGroups = filteredOpts.some(o => o.group);
  const groups = hasGroups
    ? filteredOpts.reduce((acc, o) => {
        const g = o.group || '';
        if (!acc[g]) acc[g] = [];
        acc[g].push(o);
        return acc;
      }, {})
    : null;

  const flatFiltered = filteredOpts; // for keyboard nav index

  // Display label for current value
  const selectedOpt = normOpts.find(o => o.value === currentValue);
  const displayLabel = selectedOpt?.label || '';

  const openPanel = () => {
    if (isDisabled) return;
    setOpen(true);
    setSearch('');
    setFocusedIdx(-1);
    setTimeout(() => searchRef.current?.focus(), 50);
  };

  const closePanel = () => {
    setOpen(false);
    setSearch('');
    triggerRef.current?.focus();
  };

  const select = (val) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
    closePanel();
  };

  const clear = (e) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue('');
    onChange?.('');
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!triggerRef.current?.closest('.ksrtc-select__anchor')?.contains(e.target)) {
        closePanel();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Keyboard navigation
  const handleTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      openPanel();
    }
  };

  const handlePanelKeyDown = (e) => {
    if (e.key === 'Escape') { closePanel(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIdx(i => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && focusedIdx >= 0) {
      e.preventDefault();
      const opt = flatFiltered[focusedIdx];
      if (opt && !opt.disabled) select(opt.value);
    } else if (e.key === 'Tab') {
      closePanel();
    }
  };

  const classes = [
    'ksrtc-select',
    `ksrtc-select--${variant}`,
    `ksrtc-select--${size}`,
    isError    ? 'ksrtc-select--error'    : '',
    isDisabled ? 'ksrtc-select--disabled' : '',
    open       ? 'ksrtc-select--open'     : '',
    fullWidth  ? 'ksrtc-select--full'     : '',
  ].filter(Boolean).join(' ');

  const renderOptions = (opts) => opts.map((opt) => {
    const isSelected = opt.value === currentValue;
    const globalIdx  = flatFiltered.indexOf(opt);
    const isFocused  = globalIdx === focusedIdx;
    return (
      <div
        key={opt.value}
        id={`${selectId}-opt-${globalIdx}`}
        role="option"
        aria-selected={isSelected}
        aria-disabled={opt.disabled || undefined}
        tabIndex={-1}
        className={[
          'ksrtc-select__option',
          isSelected   ? 'ksrtc-select__option--selected'  : '',
          isFocused    ? 'ksrtc-select__option--focused'   : '',
          opt.disabled ? 'ksrtc-select__option--disabled'  : '',
        ].filter(Boolean).join(' ')}
        onMouseEnter={() => setFocusedIdx(globalIdx)}
        onMouseDown={(e) => {
          e.preventDefault();
          if (!opt.disabled) select(opt.value);
        }}
      >
        {opt.icon && (
          <span
            className="ksrtc-select__option-icon material-symbols-outlined"
            aria-hidden="true"
          >
            {opt.icon}
          </span>
        )}
        {opt.label}
        {isSelected && (
          <span
            className="ksrtc-select__option-check material-symbols-outlined"
            aria-hidden="true"
          >
            check
          </span>
        )}
      </div>
    );
  });

  const labelEl = label && (
    <label htmlFor={selectId} className="ksrtc-select__label">
      {label}
      {required && <span className="ksrtc-select__required" aria-hidden="true">*</span>}
    </label>
  );

  return (
    <div className={classes} {...props}>
      {/* Filled variant: label sits above the trigger in column flow */}
      {variant !== 'outlined' && labelEl}

      <div className="ksrtc-select__anchor">
        {/* Outlined variant: label floats on the border (md3-border-lbl pattern) */}
        {variant === 'outlined' && labelEl}
        <button
          ref={triggerRef}
          id={selectId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-required={required}
          aria-invalid={isError}
          aria-describedby={supportText ? `${selectId}-support` : undefined}
          aria-activedescendant={open && focusedIdx >= 0 ? `${selectId}-opt-${focusedIdx}` : undefined}
          disabled={isDisabled}
          className="ksrtc-select__trigger"
          onClick={() => open ? closePanel() : openPanel()}
          onKeyDown={handleTriggerKeyDown}
        >
          {leadingIcon && (
            <span
              className="ksrtc-select__leading-icon material-symbols-outlined"
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          )}
          <span className={`ksrtc-select__value${!displayLabel ? ' ksrtc-select__placeholder' : ''}`}>
            {displayLabel || placeholder}
          </span>
          <span
            className="ksrtc-select__chevron material-symbols-outlined"
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>
        {/* Clear button is a sibling of trigger — NOT nested inside it (invalid HTML) (WCAG 4.1.2) */}
        {clearable && currentValue && !isDisabled && (
          <button
            type="button"
            className="ksrtc-select__clear-btn"
            onMouseDown={clear}
            onClick={clear}
            aria-label="Clear selection"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        )}

        {open && (
          <div
            ref={panelRef}
            role="listbox"
            aria-label={label || 'Options'}
            className="ksrtc-select__panel"
            onKeyDown={handlePanelKeyDown}
          >
            {searchable && (
              <div className="ksrtc-select__search">
                <span className="ksrtc-select__search-icon material-symbols-outlined">search</span>
                <input
                  ref={searchRef}
                  type="text"
                  className="ksrtc-select__search-input"
                  placeholder="Search..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setFocusedIdx(0); }}
                  onKeyDown={handlePanelKeyDown}
                  aria-label="Search options"
                />
              </div>
            )}

            {filteredOpts.length === 0 && (
              <div className="ksrtc-select__no-results">No results found</div>
            )}

            {hasGroups
              ? Object.entries(groups).map(([group, opts]) => (
                  <div key={group}>
                    {group && <div className="ksrtc-select__group-label">{group}</div>}
                    {renderOptions(opts)}
                  </div>
                ))
              : renderOptions(filteredOpts)
            }
          </div>
        )}
      </div>

      {supportText && (
        <span
          id={`${selectId}-support`}
          className="ksrtc-select__support"
          role={isError ? 'alert' : undefined}
        >
          {isError && <span className="ksrtc-select__support-icon material-symbols-outlined">error</span>}
          {supportText}
        </span>
      )}
    </div>
  );
}

export default Select;
