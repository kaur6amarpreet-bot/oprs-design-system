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

Interactive seat/berth selection for OPRS buses. Three layout variants match the three bus types operated by KSRTC:

| Layout | Bus Type | Structure |
|---|---|---|
| \`seater\` | Non-AC Ordinary / Rajahamsa | Single deck, upright seats — flat 2-row grid |
| \`sleeper\` | Airavat Club Class / Sleeper | Two decks (Upper + Lower), each with 2+1 berth layout |
| \`semi-sleeper\` | Airavat / Fly Bus | Upper deck: 2+1 berths  ·  Lower deck: flat seater rows |

**Seat data shape**
\`\`\`js
// Seater
{ number: 1, status: 'available', section: 'lower' }

// Sleeper / semi-sleeper upper
{ number: 1, status: 'available', section: 'upper', side: 'window' }
{ number: 13, status: 'available', section: 'upper', side: 'aisle' }
\`\`\`

The \`side\` field controls 2+1 placement: \`'window'\` seats are grouped in pairs (2 rows), \`'aisle'\` seats form the single bottom row.

| Status | Colour | Interaction |
|---|---|---|
| Available | Green border | Selectable |
| Selected | Dark green fill | Toggle off |
| Ladies | Pink border/bg | Selectable (women only) |
| Blocked | Grey | Not selectable |
| Conductor | Orange border/bg | Not selectable |
| Quota | Indigo border/bg | Not selectable |
        `,
      },
    },
    backgrounds: { default: 'surface' },
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['seater', 'sleeper', 'semi-sleeper'],
      description: 'Bus type layout',
      table: { category: 'Appearance' },
    },
    maxSelect: {
      table: { category: 'Behaviour' },
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum seats a user can select.',
    },
    seats:             { table: { disable: true } },
    onSelectionChange: { table: { disable: true } },
  },
};

// ─── Seat data factories ──────────────────────────────────────────

function makeSeaterBus() {
  const nums = Array.from({ length: 40 }, (_, i) => i + 1);
  const statusMap = {
    3: 'blocked', 7: 'ladies', 8: 'ladies', 14: 'blocked', 15: 'conductor',
    20: 'blocked', 21: 'blocked', 26: 'blocked', 32: 'blocked', 35: 'quota',
  };
  return nums.map(n => ({
    number: n,
    status: statusMap[n] || 'available',
    section: 'lower',
  }));
}

// 18 berths per deck: 12 window (6 cols × 2) + 6 aisle
function makeSleeperDeck(section, startNum) {
  const statusMap = {
    [startNum + 0]: 'available',
    [startNum + 1]: 'available',
    [startNum + 2]: 'ladies',
    [startNum + 3]: 'blocked',
    [startNum + 4]: 'available',
    [startNum + 5]: 'available',
    [startNum + 6]: 'quota',
    [startNum + 7]: 'available',
    [startNum + 8]: 'available',
    [startNum + 9]: 'blocked',
    [startNum + 10]: 'available',
    [startNum + 11]: 'conductor',
    [startNum + 12]: 'available',
    [startNum + 13]: 'blocked',
    [startNum + 14]: 'available',
    [startNum + 15]: 'ladies',
    [startNum + 16]: 'available',
    [startNum + 17]: 'blocked',
  };

  return [
    // Window side — 12 seats (6 columns × 2)
    ...[0,1,2,3,4,5,6,7,8,9,10,11].map(offset => ({
      number: startNum + offset,
      status: statusMap[startNum + offset] || 'available',
      section,
      side: 'window',
    })),
    // Aisle side — 6 seats
    ...[12,13,14,15,16,17].map(offset => ({
      number: startNum + offset,
      status: statusMap[startNum + offset] || 'available',
      section,
      side: 'aisle',
    })),
  ];
}

function makeSleeperBus() {
  return [
    ...makeSleeperDeck('upper', 1),
    ...makeSleeperDeck('lower', 19),
  ];
}

function makeSemiSleeperBus() {
  const statusMap = {
    20: 'blocked', 21: 'ladies', 22: 'ladies', 25: 'blocked',
    28: 'conductor', 31: 'blocked', 35: 'quota', 38: 'blocked',
  };
  const lower = Array.from({ length: 24 }, (_, i) => ({
    number: 19 + i,
    status: statusMap[19 + i] || 'available',
    section: 'lower',
  }));
  return [...makeSleeperDeck('upper', 1), ...lower];
}

// ─── Stories ──────────────────────────────────────────────────────

export const Playground = {
  args: {
    seats: makeSleeperBus(),
    layout: 'sleeper',
    maxSelect: 6,
  },
};

// ── 1. Seater ─────────────────────────────────────────────────────
export const SeaterLayout = {
  name: '1 · Seater — single deck',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-label">
        Ordinary / Non-AC buses — upright seats, flat 2-row grid
      </div>
      <SeatMap
        layout="seater"
        seats={makeSeaterBus()}
        maxSelect={6}
        onSelectionChange={s => console.log('Selected:', s)}
      />
    </div>
  ),
};

// ── 2. Sleeper ────────────────────────────────────────────────────
export const SleeperLayout = {
  name: '2 · Sleeper — upper + lower berths (2+1)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-label">
        Airavat Club Class / Full Sleeper — two decks, each with 2+1 berth layout
      </div>
      <SeatMap
        layout="sleeper"
        seats={makeSleeperBus()}
        maxSelect={6}
        onSelectionChange={s => console.log('Selected:', s)}
      />
    </div>
  ),
};

// ── 3. Semi-sleeper ───────────────────────────────────────────────
export const SemiSleeperLayout = {
  name: '3 · Semi-sleeper — upper berths + lower seats',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-label">
        Airavat / Fly Bus — upper deck: 2+1 berths · lower deck: flat seater rows
      </div>
      <SeatMap
        layout="semi-sleeper"
        seats={makeSemiSleeperBus()}
        maxSelect={6}
        onSelectionChange={s => console.log('Selected:', s)}
      />
    </div>
  ),
};

// ── All three side by side ─────────────────────────────────────────
export const AllVariants = {
  name: 'All Layout Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div className="story-label" style={{ marginBottom: 12, fontWeight: 700 }}>Seater</div>
        <SeatMap layout="seater" seats={makeSeaterBus()} maxSelect={4} />
      </div>
      <div>
        <div className="story-label" style={{ marginBottom: 12, fontWeight: 700 }}>Sleeper</div>
        <SeatMap layout="sleeper" seats={makeSleeperBus()} maxSelect={4} />
      </div>
      <div>
        <div className="story-label" style={{ marginBottom: 12, fontWeight: 700 }}>Semi-Sleeper</div>
        <SeatMap layout="semi-sleeper" seats={makeSemiSleeperBus()} maxSelect={4} />
      </div>
    </div>
  ),
};

export const AllStatuses = {
  name: 'All Seat Statuses',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-section">
        <h3>Status reference — berth cells</h3>
        <SeatMap
          layout="sleeper"
          seats={[
            { number: 1, status: 'available',  section: 'upper', side: 'window' },
            { number: 2, status: 'ladies',     section: 'upper', side: 'window' },
            { number: 3, status: 'blocked',    section: 'upper', side: 'window' },
            { number: 4, status: 'conductor',  section: 'upper', side: 'window' },
            { number: 5, status: 'quota',      section: 'lower', side: 'window' },
            { number: 6, status: 'available',  section: 'lower', side: 'window' },
            { number: 7, status: 'available',  section: 'upper', side: 'aisle'  },
            { number: 8, status: 'ladies',     section: 'lower', side: 'aisle'  },
          ]}
          maxSelect={2}
        />
      </div>
    </div>
  ),
};

export const NearlySoldOut = {
  name: 'Nearly Sold Out',
  parameters: { controls: { disable: true } },
  render: () => {
    const sparseSeats = makeSleeperBus().map(s => ({
      ...s,
      status: [1, 5, 19, 23].includes(s.number)
        ? 'available'
        : s.status === 'available' ? 'blocked' : s.status,
    }));
    return <SeatMap layout="sleeper" seats={sparseSeats} maxSelect={6} />;
  },
};
