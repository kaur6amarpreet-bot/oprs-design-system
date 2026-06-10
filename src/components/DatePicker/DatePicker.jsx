import React, { useState, useRef, useEffect } from 'react';
import './DatePicker.css';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function formatDate(date) {
  if (!date) return '';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d} ${MONTHS[date.getMonth()].slice(0,3)} ${y}`;
}

function isSameDay(a, b) {
  return a && b &&
    a.getDate()     === b.getDate() &&
    a.getMonth()    === b.getMonth() &&
    a.getFullYear() === b.getFullYear();
}

function isToday(date) {
  return isSameDay(date, new Date());
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

export function DatePicker({
  label,
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  placeholder = 'DD MMM YYYY',
  required = false,
  state = 'default',
  helperText,
  errorText,
  fullWidth = false,
  id,
  style,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [controlled] = useState(value !== undefined);
  const [internal, setInternal] = useState(defaultValue ? new Date(defaultValue) : null);
  const selected = controlled ? (value ? new Date(value) : null) : internal;

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear]  = useState((selected || today).getFullYear());
  const [viewMonth, setViewMonth] = useState((selected || today).getMonth());

  const rootRef = useRef(null);

  useEffect(() => {
    function onMouseDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const pickDate = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    if (minDate && d < new Date(minDate)) return;
    if (maxDate && d > new Date(maxDate)) return;
    if (!controlled) setInternal(d);
    onChange?.(d);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const daysInMonth  = getDaysInMonth(viewYear, viewMonth);
  const firstWeekday = getFirstDayOfWeek(viewYear, viewMonth);

  const isError    = state === 'error';
  const isDisabled = state === 'disabled';

  const triggerCls = [
    'ksrtc-dp__trigger',
    `ksrtc-dp__trigger--${state}`,
    open ? 'ksrtc-dp__trigger--open' : '',
  ].filter(Boolean).join(' ');

  const rootCls = [
    'ksrtc-dp',
    fullWidth    ? 'ksrtc-dp--full-width' : '',
    open         ? 'ksrtc-dp--open'       : '',
    isError      ? 'ksrtc-dp--error'      : '',
    isDisabled   ? 'ksrtc-dp--disabled'   : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls} ref={rootRef} style={style}>
      {/* Anchor: label floats on trigger border (md3-border-lbl pattern) */}
      <div className="ksrtc-dp__anchor">
        {label && (
          <label className="ksrtc-dp__label" htmlFor={id}>
            {label}{required && <span className="ksrtc-dp__required">*</span>}
          </label>
        )}

        {/* Trigger button */}
        <button
          id={id}
          type="button"
          className={triggerCls}
          onClick={() => !isDisabled && setOpen(o => !o)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={isError}
          disabled={isDisabled}
        >
          <span className="material-symbols-outlined ksrtc-dp__icon">calendar_today</span>
          <span className={`ksrtc-dp__value ${!selected ? 'ksrtc-dp__value--placeholder' : ''}`}>
            {selected ? formatDate(selected) : placeholder}
          </span>
          <span className="material-symbols-outlined ksrtc-dp__chevron">expand_more</span>
        </button>

        {/* Calendar panel — absolute to anchor */}
        {open && (
        <div className="ksrtc-dp__panel" role="dialog" aria-label="Choose date">
          {/* Month navigation */}
          <div className="ksrtc-dp__nav">
            <button type="button" className="ksrtc-dp__nav-btn" onClick={prevMonth} aria-label="Previous month">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="ksrtc-dp__month-year">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" className="ksrtc-dp__nav-btn" onClick={nextMonth} aria-label="Next month">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="ksrtc-dp__grid">
            {DAYS.map(d => (
              <div key={d} className="ksrtc-dp__day-header">{d}</div>
            ))}

            {/* Empty cells before first day */}
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day    = i + 1;
              const date   = new Date(viewYear, viewMonth, day);
              const isSel  = isSameDay(date, selected);
              const isTod  = isToday(date);
              const tooEarly = minDate && date < new Date(minDate);
              const tooLate  = maxDate && date > new Date(maxDate);
              const disabled = tooEarly || tooLate;

              const cls = [
                'ksrtc-dp__day',
                isSel      ? 'ksrtc-dp__day--selected' : '',
                isTod      ? 'ksrtc-dp__day--today'    : '',
                disabled   ? 'ksrtc-dp__day--disabled' : '',
              ].filter(Boolean).join(' ');

              return (
                <button
                  key={day}
                  type="button"
                  className={cls}
                  onClick={() => pickDate(day)}
                  disabled={disabled}
                  aria-label={`${day} ${MONTHS[viewMonth]} ${viewYear}${isSel ? ', selected' : ''}${isTod ? ', today' : ''}`}
                  aria-pressed={isSel}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
        )}
      </div>{/* end .ksrtc-dp__anchor */}

      {/* Helper / error text */}
      {isError && errorText ? (
        <span className="ksrtc-dp__helper ksrtc-dp__helper--error" role="alert">{errorText}</span>
      ) : helperText ? (
        <span className="ksrtc-dp__helper">{helperText}</span>
      ) : null}
    </div>
  );
}

export default DatePicker;
