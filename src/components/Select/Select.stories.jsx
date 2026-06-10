import React, { useState } from 'react';
import { Select } from './Select';

export default {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Dropdown select for single-choice inputs. Two variants matching the KSRTC product:

\`\`\`
variant="outlined"  ← KSRTC booking form (Source / Destination) — floating border label
variant="filled"    ← other OPRS screens
\`\`\`

The **outlined** variant uses the MD3 floating border label pattern — the label sits on the border of the trigger field, matching the prototype's \`md3-menu\` component exactly.

Use for: route selection, depot picker, seat class filter, city chooser, return date options.
        `,
      },
    },
    backgrounds: { default: 'surface' },
    layout: 'padded',
  },
  argTypes: {
    variant:     { control: 'radio', options: ['outlined','filled'], table: { category: 'Appearance' } },
    size:        { control: 'radio', options: ['sm','md','lg'],      table: { category: 'Appearance' } },
    state:       { control: 'radio', options: ['default','error','disabled'], table: { category: 'Appearance' } },
    searchable:  { control: 'boolean', table: { category: 'Behaviour' } },
    clearable:   { control: 'boolean', table: { category: 'Behaviour' } },
    required:    { control: 'boolean', table: { category: 'Behaviour' } },
    fullWidth:   { control: 'boolean', table: { category: 'Appearance' } },
    label:       { control: 'text',    table: { category: 'Content' } },
    placeholder: { control: 'text',    table: { category: 'Content' } },
    helperText:  { control: 'text',    table: { category: 'Content' } },
    errorText:   { control: 'text',    table: { category: 'Content' } },
    options:     { table: { disable: true } },
  },
};

const cities = ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Kalaburagi', 'Shivamogga', 'Tumakuru', 'Davanagere', 'Ballari'];
const seatClasses = [
  { value: 'airavat-club', label: 'Airavat Club Class', icon: 'star' },
  { value: 'airavat-gold', label: 'Airavat Gold Class', icon: 'workspace_premium' },
  { value: 'ambaari',      label: 'Ambaari AC',          icon: 'ac_unit' },
  { value: 'rajahamsa',    label: 'Rajahamsa Non-AC',    icon: 'directions_bus' },
  { value: 'express',      label: 'Non-AC Express',      icon: 'directions_bus' },
];

export const Playground = {
  args: {
    label: 'Destination',
    placeholder: 'Select city',
    options: cities,
    size: 'md',
    variant: 'filled',
    state: 'default',
  },
};

export const AllSizes = {
  name: 'All sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col" style={{ gap: 24 }}>
      <div className="story-section">
        <div className="story-label">Small (32px)</div>
        <Select label="City" options={cities} size="sm" placeholder="Select city" style={{ width: 220 }} />
      </div>
      <div className="story-section">
        <div className="story-label">Medium (40px) — default</div>
        <Select label="City" options={cities} size="md" placeholder="Select city" style={{ width: 220 }} />
      </div>
      <div className="story-section">
        <div className="story-label">Large (48px)</div>
        <Select label="City" options={cities} size="lg" placeholder="Select city" style={{ width: 220 }} />
      </div>
    </div>
  ),
};

export const BothVariants = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col" style={{ gap: 32 }}>
      <div>
        <div className="story-label" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
          ✓ Outlined — KSRTC booking form (Source / Destination fields)
        </div>
        <Select label="Source *" options={cities} variant="outlined" defaultValue="Bengaluru" style={{ width: 220 }} />
      </div>
      <div>
        <div className="story-label" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
          ✓ Filled — other OPRS screens
        </div>
        <Select label="Destination" options={cities} variant="filled" placeholder="Select city" style={{ width: 220 }} />
      </div>
    </div>
  ),
};

export const KSRTCBookingFields = {
  name: 'KSRTC Booking Form — Source & Destination',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const [source, setSource] = React.useState('Bengaluru');
    const [dest,   setDest]   = React.useState('');
    return (
      <div style={{
        display: 'flex', gap: 12, alignItems: 'flex-start',
        background: 'var(--color-surface)',
        padding: 24, borderRadius: 8,
        border: '1px solid var(--color-outline-variant)',
      }}>
        <Select
          label="Source *"
          options={cities}
          variant="outlined"
          value={source}
          onChange={setSource}
          required
          style={{ width: 180 }}
        />
        <Select
          label="Destination *"
          options={cities.filter(c => c !== source)}
          variant="outlined"
          value={dest}
          onChange={setDest}
          placeholder="Select"
          required
          style={{ width: 180 }}
        />
      </div>
    );
  },
};

export const AllStates = {
  name: 'All states',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row" style={{ gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Select label="Default" options={cities} placeholder="Select city" style={{ width: 200 }} />
      <Select label="With value" options={cities} defaultValue="Mysuru" style={{ width: 200 }} />
      <Select
        label="Error"
        options={cities}
        placeholder="Select city"
        state="error"
        errorText="Please select a destination"
        style={{ width: 200 }}
      />
      <Select
        label="Disabled"
        options={cities}
        placeholder="Select city"
        state="disabled"
        style={{ width: 200 }}
      />
    </div>
  ),
};

export const WithSearch = {
  name: 'Searchable',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-label">Type to filter the list</div>
      <Select
        label="Select city"
        options={cities}
        searchable
        placeholder="Choose a city"
        style={{ width: 260 }}
      />
    </div>
  ),
};

export const WithIcons = {
  name: 'Options with icons',
  parameters: { controls: { disable: true } },
  render: () => (
    <Select
      label="Bus class"
      options={seatClasses}
      placeholder="Select service type"
      leadingIcon="directions_bus"
      style={{ width: 280 }}
    />
  ),
};

export const Clearable = {
  name: 'Clearable',
  parameters: { controls: { disable: true } },
  render: () => (
    <Select
      label="Departure city"
      options={cities}
      defaultValue="Bengaluru"
      clearable
      helperText="Click × to clear the selection"
      style={{ width: 240 }}
    />
  ),
};

const groupedBuses = [
  { value: 'airavat-club', label: 'Airavat Club Class', group: 'AC Sleeper' },
  { value: 'airavat-gold', label: 'Airavat Gold Class', group: 'AC Sleeper' },
  { value: 'ambaari',      label: 'Ambaari AC Seater',  group: 'AC Seater' },
  { value: 'ambaari-plus', label: 'Ambaari Plus',       group: 'AC Seater' },
  { value: 'rajahamsa',    label: 'Rajahamsa Semi-Sleeper', group: 'Non-AC' },
  { value: 'express',      label: 'Non-AC Express',     group: 'Non-AC' },
  { value: 'ordinary',     label: 'Ordinary',           group: 'Non-AC' },
];

export const Grouped = {
  name: 'Grouped options',
  parameters: { controls: { disable: true } },
  render: () => (
    <Select
      label="Bus type"
      options={groupedBuses}
      placeholder="Select bus class"
      searchable
      style={{ width: 260 }}
    />
  ),
};

export const Required = {
  name: 'Required field',
  parameters: { controls: { disable: true } },
  render: () => (
    <Select
      label="Origin"
      options={cities}
      placeholder="Select city"
      required
      helperText="Required for booking"
      style={{ width: 240 }}
    />
  ),
};

export const InContext = {
  name: 'Booking form context',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const [from, setFrom] = useState('');
    const [to, setTo]   = useState('');
    const [cls, setCls] = useState('');
    const hasError = from && to && from === to;
    return (
      <div style={{
        maxWidth: 480,
        background: 'var(--color-surface)',
        borderRadius: 'var(--shape-lg)',
        padding: 24,
        border: '1px solid var(--color-outline-variant)',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--color-on-surface)' }}>
          Search Buses
        </h3>
        <div className="story-row" style={{ gap: 16, alignItems: 'flex-start' }}>
          <Select
            label="From *"
            options={cities}
            placeholder="Select origin"
            value={from}
            onChange={setFrom}
            variant="outlined"
            searchable
            clearable
            leadingIcon="trip_origin"
            required
            fullWidth
          />
          <Select
            label="To *"
            options={cities.filter(c => c !== from)}
            placeholder="Select destination"
            value={to}
            onChange={setTo}
            variant="outlined"
            searchable
            clearable
            leadingIcon="place"
            required
            fullWidth
            state={hasError ? 'error' : 'default'}
            errorText={hasError ? 'Origin and destination cannot be the same' : undefined}
          />
        </div>
        <Select
          label="Bus type"
          options={seatClasses}
          placeholder="All types"
          value={cls}
          onChange={setCls}
          leadingIcon="directions_bus"
          clearable
          helperText="Leave blank to see all available buses"
          fullWidth
        />
        <button
          style={{
            background: 'var(--color-primary)', color: 'var(--color-on-primary)',
            border: 'none', borderRadius: 'var(--shape-full)', padding: '12px 24px',
            fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit',
            opacity: from && to && !hasError ? 1 : .5,
          }}
        >
          Search Buses
        </button>
      </div>
    );
  },
};
