import React, { useState } from 'react';
import './SeatMap.css';

/**
 * KSRTC SeatMap — sleeper bus berth layout
 *
 * seats: array of { number, status, section }
 *   status: 'available' | 'ladies' | 'blocked' | 'conductor' | 'quota'
 *   section: 'upper' | 'lower'
 *
 * Renders two sections (upper/lower) with columns of 2 berths each.
 *
 * Accessibility:
 * - Uses <button> (not <div role="button">) for correct keyboard & AT behaviour (WCAG 4.1.2)
 * - aria-pressed communicates selected state without relying on colour alone (WCAG 1.4.1)
 * - aria-disabled on non-selectable seats (WCAG 4.1.2)
 * - Focus ring via :focus-visible (WCAG 2.4.7)
 */

export function SeatCell({ seat, isSelected, onSelect }) {
  const selectable = seat.status === 'available' || seat.status === 'ladies';

  const cls = [
    'ksrtc-seat',
    `ksrtc-seat--${seat.status}`,
    isSelected  ? 'ksrtc-seat--selected'    : '',
    !selectable ? 'ksrtc-seat--unselectable' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={cls}
      onClick={selectable ? () => onSelect(seat.number) : undefined}
      disabled={!selectable}
      aria-label={`Seat ${seat.number} — ${seat.status}${isSelected ? ', selected' : ''}`}
      aria-pressed={selectable ? isSelected : undefined}
    >
      {seat.number}
    </button>
  );
}

function BerthSection({ seats, selected, onSelect }) {
  const sorted  = [...seats].sort((a, b) => a.number - b.number);
  const columns = [];
  for (let i = 0; i < sorted.length; i += 2) {
    columns.push([sorted[i], sorted[i + 1]]);
  }

  return (
    <div className="ksrtc-berth-section">
      <div className="ksrtc-berth-row">
        {columns.map((col, ci) => (
          <div key={ci} className="ksrtc-berth-col">
            {col.map((seat, si) =>
              seat ? (
                <SeatCell
                  key={seat.number}
                  seat={seat}
                  isSelected={selected.has(seat.number)}
                  onSelect={onSelect}
                />
              ) : (
                <div key={`empty-${si}`} className="ksrtc-seat-empty" aria-hidden="true" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SeatMap({
  seats = [],
  maxSelect = 6,
  onSelectionChange,
}) {
  const [selected, setSelected] = useState(new Set());

  const toggle = (num) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else if (next.size < maxSelect) {
        next.add(num);
      }
      onSelectionChange?.(Array.from(next));
      return next;
    });
  };

  const upperSeats = seats.filter(s => s.section === 'upper');
  const lowerSeats = seats.filter(s => s.section === 'lower');
  const hasUpper   = upperSeats.length > 0;
  const hasLower   = lowerSeats.length > 0;

  return (
    <div className="ksrtc-seat-map">

      <div
        className="ksrtc-bus-container"
        role="group"
        aria-label={`Seat selection — ${selected.size} of ${maxSelect} selected`}
      >
        <div className="ksrtc-bus-grid">

          {hasUpper && (
            <>
              <div className="ksrtc-bg-left" aria-hidden="true">
                <span className="material-symbols-outlined ksrtc-steering-icon">schedule</span>
              </div>
              <BerthSection
                seats={upperSeats}
                selected={selected}
                onSelect={toggle}
              />
            </>
          )}

          {hasUpper && hasLower && (
            <>
              <div className="ksrtc-bg-left ksrtc-bg-left--lower-label" aria-hidden="true">
                <span className="ksrtc-lower-label">LOWER BERTHS</span>
              </div>
              <div className="ksrtc-berth-mid" aria-hidden="true" />
            </>
          )}

          {hasLower && (
            <>
              {!hasUpper && <div className="ksrtc-bg-left" aria-hidden="true" />}
              <BerthSection
                seats={lowerSeats}
                selected={selected}
                onSelect={toggle}
              />
            </>
          )}
        </div>
      </div>

      {/* Legend — purely visual, described via seat aria-labels */}
      <div className="ksrtc-seat-legend" aria-hidden="true">
        {[
          { key: 'available', label: 'Available' },
          { key: 'selected',  label: 'Selected'  },
          { key: 'ladies',    label: 'Ladies'    },
          { key: 'blocked',   label: 'Blocked'   },
          { key: 'conductor', label: 'Conductor' },
          { key: 'quota',     label: 'Quota'     },
        ].map(({ key, label }) => (
          <div key={key} className={`ksrtc-legend-item ksrtc-legend--${key}`}>
            <span className="ksrtc-legend-swatch" />
            {label}
          </div>
        ))}
      </div>

      {/* Selection summary — announced as a live region */}
      <div
        className="ksrtc-seat-summary"
        aria-live="polite"
        aria-atomic="true"
        style={{ minHeight: 36 }}
      >
        {selected.size > 0 && (
          <>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }} aria-hidden="true">event_seat</span>
            Seats selected:{' '}
            <strong>{Array.from(selected).sort((a, b) => a - b).join(', ')}</strong>
            <span className="ksrtc-seat-summary__count">({selected.size} / {maxSelect})</span>
          </>
        )}
      </div>
    </div>
  );
}

export default SeatMap;
