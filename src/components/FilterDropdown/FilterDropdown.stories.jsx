import React, { useState } from 'react';
import { FilterDropdown } from './FilterDropdown';

export default {
  title: 'OPRS Specific/FilterDropdown',
  component: FilterDropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Multi-select filter chip with dropdown panel. Used in the **section subheader** to filter bus results by class type — AIRAVAT CLUB CLASS, RAJAHAMSA, NON AC SLEEPER, etc.

- No selection = "All" is checked (show all results)
- 1 selected = shows the selected label in the trigger
- 2+ selected = shows "Class: N" with a count badge
- Click outside or select again to deselect

\`\`\`jsx
<FilterDropdown
  label="Class Type"
  options={['AIRAVAT', 'RAJAHAMSA', 'NON AC SLEEPER']}
  onChange={v => console.log('Filter:', v)}
/>
\`\`\`
        `,
      },
    },
    backgrounds: { default: 'surface' },
    layout: 'padded',
  },
  argTypes: {
    label:    { control: 'text',    table: { category: 'Content' } },
    allLabel: { control: 'text',    table: { category: 'Content' } },
    options:  { table: { disable: true } },
    value:    { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

const BUS_CLASSES = [
  'AIRAVAT CLUB CLASS',
  'AIRAVAT GOLD CLASS',
  'RAJAHAMSA AC',
  'NON AC SLEEPER',
  'NON AC EXPRESS',
  'ORDINARY',
];

export const Playground = {
  render: (args) => {
    const [sel, setSel] = useState([]);
    return (
      <FilterDropdown
        {...args}
        options={BUS_CLASSES}
        value={sel}
        onChange={setSel}
        label={args.label || 'Class Type'}
      />
    );
  },
  args: { label: 'Class Type' },
};

export const WithSelection = {
  name: 'With active selection',
  parameters: { controls: { disable: true } },
  render: () => {
    const [sel, setSel] = useState(['AIRAVAT CLUB CLASS', 'AIRAVAT GOLD CLASS']);
    return (
      <div className="story-col" style={{ gap: 12 }}>
        <div className="story-label">2 classes selected — shows count badge</div>
        <FilterDropdown
          label="Class Type"
          options={BUS_CLASSES}
          value={sel}
          onChange={setSel}
        />
        <div style={{ fontSize: 12, color: 'var(--color-on-surface-variant)' }}>
          Active filters: {sel.length === 0 ? 'All' : sel.join(', ')}
        </div>
      </div>
    );
  },
};

export const InContext = {
  name: 'In Context — results subheader',
  parameters: { controls: { disable: true } },
  render: () => {
    const [classFilter, setClassFilter] = useState([]);
    const [sortFilter, setSortFilter]   = useState([]);

    const allBuses = [
      { name: 'AIRAVAT CLUB CLASS',  time: '06:30', fare: 899, seats: 14 },
      { name: 'AIRAVAT GOLD CLASS',  time: '07:15', fare: 1099, seats: 8 },
      { name: 'RAJAHAMSA AC',        time: '08:00', fare: 650, seats: 22 },
      { name: 'NON AC SLEEPER',      time: '09:30', fare: 420, seats: 30 },
      { name: 'NON AC EXPRESS',      time: '10:00', fare: 280, seats: 40 },
    ];

    const shown = classFilter.length === 0
      ? allBuses
      : allBuses.filter(b => classFilter.includes(b.name));

    return (
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 12,
        overflow: 'hidden',
        maxWidth: 600,
      }}>
        {/* Subheader with filter */}
        <div style={{
          background: 'var(--color-surface-container-low)',
          borderBottom: '1px solid var(--color-outline-variant)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {shown.length} buses found
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <FilterDropdown
              label="Class Type"
              options={BUS_CLASSES}
              value={classFilter}
              onChange={setClassFilter}
            />
            <FilterDropdown
              label="Departure"
              options={['Before 6 AM', '6 AM – 12 PM', '12 PM – 6 PM', 'After 6 PM']}
              value={sortFilter}
              onChange={setSortFilter}
            />
          </div>
        </div>

        {/* Bus list */}
        {shown.map(bus => (
          <div key={bus.name} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderBottom: '1px solid var(--color-outline-variant)',
            gap: 12,
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-on-surface)' }}>{bus.name}</div>
              <div style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', marginTop: 2 }}>
                {bus.time} · {bus.seats} seats · ₹ {bus.fare}
              </div>
            </div>
            <button style={{
              background: 'var(--color-secondary)', color: 'var(--color-on-secondary)',
              border: 'none', borderRadius: 20, padding: '6px 16px',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Select
            </button>
          </div>
        ))}

        {shown.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--color-on-surface-variant)', fontSize: 13 }}>
            No buses match the selected filters.
          </div>
        )}
      </div>
    );
  },
};
