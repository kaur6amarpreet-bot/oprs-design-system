import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { Select } from '../Select/Select';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Custom calendar picker used for **Journey Date** and **Return Date** in the KSRTC booking form. Uses the MD3 outlined trigger with floating border label — matches the Source and Destination Select fields exactly.

Opens a calendar panel with month navigation. Supports min/max date constraints for booking windows.

\`\`\`
<DatePicker label="Journey Date" required
  minDate={new Date()}
  helperText="Tickets available up to 60 days in advance"
/>
\`\`\`
        `,
      },
    },
    backgrounds: { default: 'surface' },
    layout: 'padded',
  },
  argTypes: {
    label:       { control: 'text',    table: { category: 'Content' } },
    placeholder: { control: 'text',    table: { category: 'Content' } },
    helperText:  { control: 'text',    table: { category: 'Content' } },
    errorText:   { control: 'text',    table: { category: 'Content' } },
    state:       { control: 'radio',   options: ['default','error','disabled'], table: { category: 'Appearance' } },
    required:    { control: 'boolean', table: { category: 'Behaviour' } },
    fullWidth:   { control: 'boolean', table: { category: 'Appearance' } },
    value:       { table: { disable: true } },
    defaultValue:{ table: { disable: true } },
    onChange:    { table: { disable: true } },
    minDate:     { table: { disable: true } },
    maxDate:     { table: { disable: true } },
  },
};

const today = new Date();
const in60  = new Date(); in60.setDate(today.getDate() + 60);

export const Playground = {
  args: {
    label: 'Journey Date',
    required: true,
    helperText: 'Select your travel date',
    state: 'default',
  },
};

export const AllStates = {
  name: 'All States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row" style={{ gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div className="story-label">Default</div>
        <DatePicker label="Journey Date" required style={{ width: 220 }} />
      </div>
      <div>
        <div className="story-label">With value</div>
        <DatePicker label="Journey Date" defaultValue={new Date()} style={{ width: 220 }} />
      </div>
      <div>
        <div className="story-label">Error</div>
        <DatePicker
          label="Journey Date"
          state="error"
          errorText="Please select a valid date"
          style={{ width: 220 }}
        />
      </div>
      <div>
        <div className="story-label">Disabled</div>
        <DatePicker label="Return Date" state="disabled" style={{ width: 220 }} />
      </div>
    </div>
  ),
};

export const WithMinMax = {
  name: 'Min / Max date (booking window)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-label">Constrained to today → +60 days (OPRS advance booking window)</div>
      <DatePicker
        label="Journey Date"
        required
        minDate={today}
        maxDate={in60}
        helperText="Tickets available up to 60 days in advance"
        style={{ width: 240 }}
      />
    </div>
  ),
};

export const InContext = {
  name: 'In Context — Search form',
  parameters: { controls: { disable: true } },
  render: () => {
    const [journey, setJourney] = useState(null);
    const [returnD, setReturn]  = useState(null);
    const [isReturn, setIsReturn] = useState(false);

    const minReturn = journey ? new Date(journey) : today;

    return (
      <div style={{
        maxWidth: 520,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 16,
        padding: 24,
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-on-surface)' }}>
          Bus Search
        </div>

        <DatePicker
          label="Journey Date"
          required
          value={journey}
          onChange={setJourney}
          minDate={today}
          maxDate={in60}
          helperText="Tickets available up to 60 days in advance"
          fullWidth
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="checkbox"
            id="return-toggle"
            checked={isReturn}
            onChange={e => setIsReturn(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
          />
          <label htmlFor="return-toggle" style={{ fontSize: 13, cursor: 'pointer', color: 'var(--color-on-surface)' }}>
            Round trip — add return date
          </label>
        </div>

        {isReturn && (
          <DatePicker
            label="Return Date"
            required
            value={returnD}
            onChange={setReturn}
            minDate={minReturn}
            maxDate={in60}
            helperText="Must be after journey date"
            state={returnD && journey && returnD < journey ? 'error' : 'default'}
            errorText="Return date must be after journey date"
            fullWidth
          />
        )}

        <button style={{
          background: 'var(--color-secondary)',
          color: 'var(--color-on-secondary)',
          border: 'none', borderRadius: 'var(--shape-full)',
          padding: '12px 24px', fontWeight: 700, fontSize: 14,
          cursor: 'pointer', fontFamily: 'inherit',
          opacity: journey ? 1 : 0.5,
        }}>
          Search Buses
        </button>
      </div>
    );
  },
};

export const KSRTCSearchRow = {
  name: 'KSRTC Search Row — Source + Destination + Date',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cities = ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Kalaburagi'];
    const [src, setSrc]   = useState('Bengaluru');
    const [dst, setDst]   = useState('');
    const [date, setDate] = useState(null);
    return (
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 12, padding: 20,
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <Select
            label="Source *"
            options={cities}
            variant="outlined"
            value={src}
            onChange={setSrc}
            required
            style={{ flex: '1 1 140px', minWidth: 140 }}
          />
          <Select
            label="Destination *"
            options={cities.filter(c => c !== src)}
            variant="outlined"
            value={dst}
            onChange={setDst}
            placeholder="Select"
            required
            style={{ flex: '1 1 140px', minWidth: 140 }}
          />
          <DatePicker
            label="Journey Date *"
            value={date}
            onChange={setDate}
            minDate={new Date()}
            required
            style={{ flex: '1 1 160px', minWidth: 160 }}
          />
          <button className="btn btn-filled" style={{ height: 40, flexShrink: 0 }}>
            Search
          </button>
        </div>
      </div>
    );
  },
};
