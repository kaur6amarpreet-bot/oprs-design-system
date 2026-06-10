import React, { useState, useRef, useEffect, useId } from 'react';
import './FilterDropdown.css';

/**
 * KSRTC FilterDropdown
 *
 * Multi-select filter dropdown used in the section subheader to filter bus class types
 * (AIRAVAT, RAJAHAMSA, NON AC SLEEPER, etc.)
 *
 * options: string[] | { value, label }[]
 * value:   string[]   — controlled selection
 * onChange: (selected: string[]) => void
 * label:   string — trigger button label (e.g. "Class Type")
 * allLabel: string — label for the "all" state (default "All")
 */

export function FilterDropdown({
  label = 'Filter',
  options = [],
  value,
  defaultValue,
  onChange,
  allLabel = 'All',
  style,
}) {
  const normalised = options.map(o =>
    typeof o === 'string' ? { value: o, label: o } : o
  );

  const [controlled]  = useState(value !== undefined);
  const [internal, setInternal] = useState(defaultValue || []);
  const selected = controlled ? (value || []) : internal;

  const [open, setOpen] = useState(false);
  const rootRef  = useRef(null);
  const uid      = useId();
  const triggerId = `filter-trigger-${uid}`;
  const panelId   = `filter-panel-${uid}`;

  useEffect(() => {
    function onDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const toggle = (val) => {
    const next = selected.includes(val)
      ? selected.filter(v => v !== val)
      : [...selected, val];
    if (!controlled) setInternal(next);
    onChange?.(next);
  };

  const clearAll = () => {
    if (!controlled) setInternal([]);
    onChange?.([]);
  };

  const hasFilter = selected.length > 0 && selected.length < normalised.length;

  const triggerLabel = hasFilter
    ? selected.length === 1
      ? normalised.find(o => o.value === selected[0])?.label || selected[0]
      : `${label}: ${selected.length}`
    : label;

  return (
    <div className={`ksrtc-filter ${open ? 'ksrtc-filter--open' : ''}`} ref={rootRef} style={style}>
      {/* Trigger */}
      <button
        type="button"
        id={triggerId}
        className={`ksrtc-filter__btn ${hasFilter ? 'ksrtc-filter__btn--active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="material-symbols-outlined ksrtc-filter__icon" aria-hidden="true">tune</span>
        <span className="ksrtc-filter__label">{triggerLabel}</span>
        {hasFilter && (
          <span className="ksrtc-filter__count">{selected.length}</span>
        )}
        <span className="material-symbols-outlined ksrtc-filter__chevron" aria-hidden="true">
          {open ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div
          id={panelId}
          className="ksrtc-filter__panel"
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={triggerId}
        >

          {/* All option */}
          <button
            type="button"
            className={`ksrtc-filter__option ${selected.length === 0 ? 'ksrtc-filter__option--selected' : ''}`}
            onClick={clearAll}
            role="option"
            aria-selected={selected.length === 0}
          >
            <span className="ksrtc-filter__check">
              {selected.length === 0 && (
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
              )}
            </span>
            {allLabel}
          </button>

          <div className="ksrtc-filter__divider" />

          {normalised.map(opt => {
            const isOn = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                className={`ksrtc-filter__option ${isOn ? 'ksrtc-filter__option--selected' : ''}`}
                onClick={() => toggle(opt.value)}
                role="option"
                aria-selected={isOn}
              >
                <span className="ksrtc-filter__check">
                  {isOn && (
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
                  )}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
