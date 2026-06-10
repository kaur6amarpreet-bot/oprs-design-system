import React from 'react';
import { SeatMap } from './SeatMap';

export default {
  title: 'OPRS Specific/SeatMap',
  component: SeatMap,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Interactive seat selection for OPRS sleeper buses. Two sections — **upper berths** and **lower berths** — each laid out as columns of 2 berths side by side.

| Status | Colour | Interaction |
|---|---|---|
| Available | Green border | Selectable |
| Selected | Dark green fill | Toggle off |
| Ladies | Pink border | Selectable (women only — UI allows, backend validates) |
| Blocked | Grey | Not selectable |
| Conductor | Orange border | Not selectable |
| Quota | Blue border | Not selectable |

\`maxSelect\` defaults to 6 per booking.
        `,
      },
    },
    backgrounds: { default: 'surface' },
  },
  argTypes: {
    maxSelect: {
      table: { category: 'Behaviour' },
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum seats a user can select in one booking.',
    },
    seats:              { table: { disable: true } },
    onSelectionChange:  { table: { disable: true } },
  },
};

// ─── Seat data factory ──────────────────────────────────────────────
// Matches the actual OPRS prototype numbering:
// Upper: cols 1–10 → seats (1,2), (3,4), (7,8), (11,12), (15,16), (19,20), (23,24), (27,28), (31,32), (37,38)
// Lower: cols 1–10 → seats (5,6), (9,10), (13,14), (17,18), (21,22), (25,26), (29,30), (33,34), (35,36), (39,40)

function makeFullBus() {
  const upperNums  = [1,2, 3,4, 7,8, 11,12, 15,16, 19,20, 23,24, 27,28, 31,32, 37,38];
  const lowerNums  = [5,6, 9,10, 13,14, 17,18, 21,22, 25,26, 29,30, 33,34, 35,36, 39,40];

  const statuses = {
    1: 'available', 2: 'available',
    3: 'available', 4: 'blocked',
    7: 'blocked',   8: 'ladies',
    11: 'available',12: 'available',
    15: 'available',16: 'blocked',
    19: 'blocked',  20: 'conductor',
    23: 'blocked',  24: 'available',
    27: 'available',28: 'available',
    31: 'available',32: 'blocked',
    37: 'blocked',  38: 'blocked',
    5: 'available', 6: 'available',
    9: 'available', 10: 'available',
    13: 'available',14: 'available',
    17: 'ladies',   18: 'ladies',
    21: 'available',22: 'blocked',
    25: 'blocked',  26: 'blocked',
    29: 'blocked',  30: 'blocked',
    33: 'available',34: 'blocked',
    35: 'blocked',  36: 'blocked',
    39: 'available',40: 'quota',
  };

  return [
    ...upperNums.map(n => ({ number: n, status: statuses[n] || 'available', section: 'upper' })),
    ...lowerNums.map(n => ({ number: n, status: statuses[n] || 'available', section: 'lower' })),
  ];
}

const fullBusSeats = makeFullBus();

// ─── Stories ────────────────────────────────────────────────────────

export const Playground = {
  args: {
    seats: fullBusSeats,
    maxSelect: 6,
  },
};

export const FullBus = {
  name: 'Full Bus — Airavat Club Class',
  parameters: { controls: { disable: true } },
  render: () => (
    <SeatMap
      seats={fullBusSeats}
      maxSelect={6}
      onSelectionChange={(s) => console.log('Selected seats:', s)}
    />
  ),
};

export const LowerOnly = {
  name: 'Lower Berths Only',
  parameters: { controls: { disable: true } },
  render: () => (
    <SeatMap
      seats={fullBusSeats.filter(s => s.section === 'lower')}
      maxSelect={4}
    />
  ),
};

export const AllStatuses = {
  name: 'All Seat Statuses',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-section">
        <h3>Status reference — one of each</h3>
        <SeatMap
          seats={[
            { number: 1,  status: 'available',  section: 'upper' },
            { number: 2,  status: 'ladies',     section: 'upper' },
            { number: 3,  status: 'blocked',    section: 'upper' },
            { number: 4,  status: 'conductor',  section: 'upper' },
            { number: 5,  status: 'quota',      section: 'upper' },
          ]}
          maxSelect={2}
        />
      </div>
      <div className="story-section">
        <h3>Colour tokens</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12,
          fontSize: 12, color: 'var(--color-on-surface-variant)',
        }}>
          {[
            { s: 'Available',  bg: '#fff',     bd: '#2e7d32', tx: '#2e7d32' },
            { s: 'Selected',   bg: '#1b5e20',  bd: '#1b5e20', tx: '#fff'    },
            { s: 'Ladies',     bg: '#fce4ec',  bd: '#c2185b', tx: '#c2185b' },
            { s: 'Blocked',    bg: '#f0f0f0',  bd: '#b0b0b0', tx: '#b0b0b0' },
            { s: 'Conductor',  bg: '#fff3e0',  bd: '#e65100', tx: '#e65100' },
            { s: 'Quota',      bg: '#e8eaf6',  bd: '#3949ab', tx: '#3949ab' },
          ].map(({ s, bg, bd, tx }) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 6, border: `1.5px solid ${bd}`, background: bg, color: tx, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                01
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{s}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 10 }}>bg {bg} / border {bd}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="story-section">
        <h3>Accessibility notes</h3>
        <div style={{ background: '#F8FAFF', border: '1px solid #D6E4FF', borderRadius: 10, padding: '14px 18px' }}>
          <ul style={{ fontSize: 13, color: '#44464F', lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
            <li>Each seat has <span className="ds-prop">aria-label</span>: "Seat 14 — available".</li>
            <li>Blocked, conductor, and quota seats are <span className="ds-prop">aria-disabled</span> and <span className="ds-prop">tabIndex="-1"</span>.</li>
            <li>Selected state is communicated via <span className="ds-prop">aria-pressed</span>, not just colour.</li>
            <li>Ladies seats are selectable — the UI allows booking; the backend enforces the reservation.</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const NearlySoldOut = {
  name: 'Nearly Sold Out',
  parameters: { controls: { disable: true } },
  render: () => {
    // Only a few available seats
    const sparseSeats = fullBusSeats.map(s => ({
      ...s,
      status: [1, 12, 33, 39].includes(s.number)
        ? 'available'
        : s.status === 'available' ? 'blocked' : s.status,
    }));
    return <SeatMap seats={sparseSeats} maxSelect={6} />;
  },
};
