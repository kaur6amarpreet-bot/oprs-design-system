import React, { useState } from 'react';
import './SeatMap.css';

/**
 * KSRTC SeatMap
 *
 * layout: 'seater' | 'sleeper' | 'semi-sleeper'
 *   seater       — single-deck, upright seats, flat 2-row grid (unchanged)
 *   sleeper      — two decks (upper + lower), both use 2+1 berth layout
 *   semi-sleeper — upper deck: 2+1 berths  |  lower deck: flat seater rows
 *
 * seats: [{ number, status, section, side? }]
 *   status:  'available' | 'ladies' | 'blocked' | 'conductor' | 'quota'
 *   section: 'upper' | 'lower'
 *   side:    'window' | 'aisle'  — required for sleeper/semi-sleeper upper seats
 */

export function SeatCell({ seat, isSelected, onSelect, cellType = 'berth' }) {
  const selectable = seat.status === 'available' || seat.status === 'ladies';

  const cls = [
    'ksrtc-seat',
    `ksrtc-seat--${seat.status}`,
    `ksrtc-seat--${cellType}`,
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

// 2+2 seater layout — two rows top, horizontal aisle gap, two rows bottom
function SeaterSection({ seats, selected, onSelect }) {
  const sorted = [...seats].sort((a, b) => a.number - b.number);
  const half   = Math.ceil(sorted.length / 2);
  const top    = sorted.slice(0, half);
  const bottom = sorted.slice(half);

  const toCols = arr => {
    const cols = [];
    for (let i = 0; i < arr.length; i += 2) cols.push(arr.slice(i, i + 2));
    return cols;
  };

  const renderCols = (cols) => cols.map((col, ci) => (
    <div key={ci} className="ksrtc-berth-col">
      {col.map((seat, si) =>
        seat ? (
          <SeatCell key={seat.number} seat={seat} isSelected={selected.has(seat.number)} onSelect={onSelect} cellType="seater" />
        ) : (
          <div key={`e${si}`} className="ksrtc-seat-empty ksrtc-seat-empty--seater" aria-hidden="true" />
        )
      )}
    </div>
  ));

  return (
    <div className="ksrtc-seater-section">
      <div className="ksrtc-seater-rows">{renderCols(toCols(top))}</div>
      <div className="ksrtc-aisle-gap" aria-hidden="true" />
      <div className="ksrtc-seater-rows">{renderCols(toCols(bottom))}</div>
    </div>
  );
}

// Flat column-of-2 layout — seater and semi-sleeper lower
function BerthSection({ seats, selected, onSelect, cellType = 'seater' }) {
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
                  cellType={cellType}
                />
              ) : (
                <div
                  key={`empty-${si}`}
                  className={`ksrtc-seat-empty ksrtc-seat-empty--${cellType}`}
                  aria-hidden="true"
                />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 2+1 berth layout — sleeper upper/lower and semi-sleeper upper
function DeckSection({ seats, selected, onSelect }) {
  const windowSeats = seats
    .filter(s => s.side === 'window')
    .sort((a, b) => a.number - b.number);
  const aisleSeats = seats
    .filter(s => s.side === 'aisle')
    .sort((a, b) => a.number - b.number);

  const windowCols = [];
  for (let i = 0; i < windowSeats.length; i += 2) {
    windowCols.push(windowSeats.slice(i, i + 2));
  }

  return (
    <div className="ksrtc-deck-section">
      <div className="ksrtc-berth-window-rows">
        {windowCols.map((col, ci) => (
          <div key={ci} className="ksrtc-berth-col">
            {col.map(seat => (
              <SeatCell
                key={seat.number}
                seat={seat}
                isSelected={selected.has(seat.number)}
                onSelect={onSelect}
                cellType="berth"
              />
            ))}
            {col.length < 2 && (
              <div className="ksrtc-seat-empty ksrtc-seat-empty--berth" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      <div className="ksrtc-aisle-gap" aria-hidden="true" />
      <div className="ksrtc-berth-aisle-row">
        {aisleSeats.map(seat => (
          <SeatCell
            key={seat.number}
            seat={seat}
            isSelected={selected.has(seat.number)}
            onSelect={onSelect}
            cellType="berth"
          />
        ))}
      </div>
    </div>
  );
}

// Deck container (Upper / Lower) with label + optional steering icon — left side
function Deck({ label, showSteering = false, children }) {
  return (
    <div className="ksrtc-deck">
      {showSteering ? (
        <span className="material-symbols-outlined ksrtc-deck-steering" aria-hidden="true">
          radio_button_unchecked
        </span>
      ) : (
        <div className="ksrtc-deck-steering-placeholder" aria-hidden="true" />
      )}
      <span className="ksrtc-deck-label" aria-hidden="true">{label}</span>
      <div className="ksrtc-deck-body">{children}</div>
    </div>
  );
}

export function SeatMap({
  seats = [],
  layout = 'sleeper',
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

  return (
    <div className={`ksrtc-seat-map ksrtc-seat-map--${layout}`}>

      <div
        role="group"
        aria-label={`Seat selection — ${selected.size} of ${maxSelect} selected`}
      >
        {/* ── Seater — 2+2 horizontal layout ── */}
        {layout === 'seater' && (
          <div className="ksrtc-bus-container">
            <div className="ksrtc-bus-grid">
              <div className="ksrtc-bg-left" aria-hidden="true">
                <span className="material-symbols-outlined ksrtc-steering-icon">schedule</span>
                <span className="ksrtc-bg-label">Lower Berths</span>
              </div>
              <SeaterSection seats={seats} selected={selected} onSelect={toggle} />
            </div>
          </div>
        )}

        {/* ── Sleeper — two decks, both 2+1 berths ── */}
        {layout === 'sleeper' && (
          <div className="ksrtc-decks-wrap">
            <Deck label="Upper">
              <DeckSection seats={upperSeats} selected={selected} onSelect={toggle} />
            </Deck>
            <Deck label="Lower" showSteering>
              <DeckSection seats={lowerSeats} selected={selected} onSelect={toggle} />
            </Deck>
          </div>
        )}

        {/* ── Semi-sleeper — upper: 2+1 berths | lower: flat 2-row seater ── */}
        {layout === 'semi-sleeper' && (
          <div className="ksrtc-decks-wrap">
            <Deck label="Upper">
              <DeckSection seats={upperSeats} selected={selected} onSelect={toggle} />
            </Deck>
            <Deck label="Lower" showSteering>
              <BerthSection seats={lowerSeats} selected={selected} onSelect={toggle} cellType="seater" />
            </Deck>
          </div>
        )}
      </div>

      {/* Legend */}
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

      {/* Selection summary — live region */}
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
