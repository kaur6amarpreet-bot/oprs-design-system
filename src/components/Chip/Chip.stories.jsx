import React, { useState } from 'react';
import { Chip } from './Chip';

export default {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compact interactive elements for filters, status, and metadata. Filter chips toggle. Badge chips display counts or fares. Success chips show confirmed states.',
      },
    },
  },
  argTypes: {
    variant:  { control: 'select', options: ['filter', 'assist', 'badge', 'success'] },
    selected: { control: 'boolean', description: 'Only applies to filter chips' },
    icon:     { control: 'text' },
  },
};

export const Playground = {
  args: { variant: 'filter', children: 'AC Sleeper', selected: false },
};

export const AllVariants = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-section">
        <h3>Filter Chips — Bus Class Filters</h3>
        <FilterChipDemo />
      </div>
      <div className="story-section">
        <h3>Assist / Info Chips</h3>
        <div className="story-row">
          <Chip variant="assist" icon="wifi">Wi-Fi</Chip>
          <Chip variant="assist" icon="ac_unit">AC</Chip>
          <Chip variant="assist" icon="airline_seat_flat">Sleeper</Chip>
          <Chip variant="assist" icon="power">Charging</Chip>
        </div>
      </div>
      <div className="story-section">
        <h3>Badge Chips — Fare / Count</h3>
        <div className="story-row">
          <Chip variant="badge">₹ 899</Chip>
          <Chip variant="badge">14 Seats</Chip>
          <Chip variant="badge">New</Chip>
        </div>
      </div>
      <div className="story-section">
        <h3>Success Chips — Status</h3>
        <div className="story-row">
          <Chip variant="success" icon="check_circle">Confirmed</Chip>
          <Chip variant="success" icon="check">Booked</Chip>
          <Chip variant="success">Available</Chip>
        </div>
      </div>
    </div>
  ),
};

function FilterChipDemo() {
  const filters = ['AIRAVAT CLUB', 'RAJAHAMSA', 'AC SLEEPER', 'NON AC', 'AMBAARI'];
  const [active, setActive] = useState(['AIRAVAT CLUB']);
  const toggle = (f) => setActive(prev =>
    prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
  );
  return (
    <div className="story-row">
      {filters.map(f => (
        <Chip key={f} variant="filter" selected={active.includes(f)} onClick={() => toggle(f)}>
          {f}
        </Chip>
      ))}
    </div>
  );
}

export const InteractiveFilter = {
  name: 'Interactive Filter Chip',
  parameters: { controls: { disable: true } },
  render: () => <FilterChipDemo />,
};
