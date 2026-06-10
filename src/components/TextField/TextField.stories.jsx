import React, { useState } from 'react';
import { TextField } from './TextField';

export default {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'surface' },
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

OPRS uses the **Material Design 3 filled** input across the entire product — search forms, passenger details, filters, OTP entry. One type, consistent everywhere.

The filled variant uses a surface-container background, rounded top corners, and a 2px primary-coloured active indicator on the bottom border.

\`\`\`
variant="filled"   ← default for all form inputs
variant="search"   ← pill shape, search bars only
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant:     { control: 'radio', options: ['filled', 'outlined', 'search'], table: { category: 'Appearance' } },
    size:        { control: 'radio', options: ['sm', 'md', 'lg'],               table: { category: 'Appearance' } },
    state:       { control: 'radio', options: ['default', 'error', 'disabled', 'readonly'], table: { category: 'Appearance' } },
    type:        { control: 'select', options: ['text', 'email', 'tel', 'number', 'password', 'search', 'textarea'], table: { category: 'Appearance' } },
    fullWidth:   { control: 'boolean', table: { category: 'Appearance' } },
    label:       { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    helperText:  { control: 'text', table: { category: 'Content' } },
    errorText:   { control: 'text', table: { category: 'Content' } },
    prefix:      { control: 'text', table: { category: 'Content' } },
    suffix:      { control: 'text', table: { category: 'Content' } },
    leadingIcon: { control: 'text', table: { category: 'Content' } },
    clearable:   { control: 'boolean', table: { category: 'Behaviour' } },
    required:    { control: 'boolean', table: { category: 'Behaviour' } },
    showCount:   { control: 'boolean', table: { category: 'Behaviour' } },
    maxLength:   { control: 'number',  table: { category: 'Behaviour' } },
  },
};

export const Playground = {
  args: {
    label: 'Origin',
    placeholder: 'Enter city name',
    variant: 'filled',
    size: 'md',
    state: 'default',
    leadingIcon: 'trip_origin',
    clearable: true,
    helperText: 'Type to search for a city',
  },
};

export const AllStates = {
  name: 'All States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-section">
        <h3>Filled — all states</h3>
        <div className="story-row" style={{ gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div className="story-col" style={{ gap: 4, minWidth: 200 }}>
            <div className="story-label">Empty</div>
            <TextField variant="filled" label="Origin" placeholder="Select city" />
          </div>
          <div className="story-col" style={{ gap: 4, minWidth: 200 }}>
            <div className="story-label">Has value</div>
            <TextField variant="filled" label="Origin" defaultValue="Bengaluru" />
          </div>
          <div className="story-col" style={{ gap: 4, minWidth: 200 }}>
            <div className="story-label">Error</div>
            <TextField variant="filled" label="Origin" defaultValue="BLR" state="error" errorText="Select a valid city" />
          </div>
          <div className="story-col" style={{ gap: 4, minWidth: 200 }}>
            <div className="story-label">Disabled</div>
            <TextField variant="filled" label="Origin" defaultValue="Bengaluru" state="disabled" />
          </div>
          <div className="story-col" style={{ gap: 4, minWidth: 200 }}>
            <div className="story-label">Read-only</div>
            <TextField variant="filled" label="PNR" defaultValue="OPRS20240614" state="readonly" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes = {
  name: 'All Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row" style={{ gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <div>
        <div className="story-label">Small · 32px</div>
        <TextField variant="filled" label="Coupon" placeholder="e.g. OPRS20" size="sm" style={{ width: 180 }} />
      </div>
      <div>
        <div className="story-label">Medium · 40px (default)</div>
        <TextField variant="filled" label="From" placeholder="Bengaluru" size="md" style={{ width: 200 }} />
      </div>
      <div>
        <div className="story-label">Large · 48px</div>
        <TextField variant="filled" label="Destination" placeholder="Mysuru" size="lg" style={{ width: 220 }} />
      </div>
    </div>
  ),
};

export const SearchVariant = {
  name: 'Search variant (pill)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-label">Used only in search bars — never in forms</div>
      <div className="story-row" style={{ gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <TextField variant="search" placeholder="Search buses, routes..." leadingIcon="search" clearable style={{ width: 300 }} />
        <TextField variant="search" placeholder="Search" leadingIcon="search" clearable defaultValue="Bengaluru to Mysuru" style={{ width: 300 }} />
      </div>
    </div>
  ),
};

export const AddOns = {
  name: 'Add-ons',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-section">
        <h3>Leading icons</h3>
        <div className="story-row" style={{ gap: 20, flexWrap: 'wrap' }}>
          <TextField variant="filled" label="Origin"      placeholder="City" leadingIcon="trip_origin"    style={{ width: 200 }} />
          <TextField variant="filled" label="Destination" placeholder="City" leadingIcon="place"          style={{ width: 200 }} />
          <TextField variant="filled" label="Date"        placeholder="DD/MM/YYYY" leadingIcon="calendar_today" style={{ width: 200 }} />
          <TextField variant="filled" label="Phone"       placeholder="+91 98765 43210" leadingIcon="phone" style={{ width: 200 }} />
        </div>
      </div>
      <div className="story-section">
        <h3>Prefix / Suffix</h3>
        <div className="story-row" style={{ gap: 20, flexWrap: 'wrap' }}>
          <TextField variant="filled" label="Fare"     prefix="₹" placeholder="0.00"  style={{ width: 180 }} />
          <TextField variant="filled" label="Duration" suffix="hrs" placeholder="2.5" style={{ width: 180 }} />
        </div>
      </div>
      <div className="story-section">
        <h3>Clearable &amp; Password</h3>
        <div className="story-row" style={{ gap: 20, flexWrap: 'wrap' }}>
          <TextField variant="filled" label="Origin" defaultValue="Bengaluru" leadingIcon="trip_origin" clearable style={{ width: 240 }} />
          <TextField variant="filled" label="Password" placeholder="Enter password" type="password" style={{ width: 240 }} />
        </div>
      </div>
    </div>
  ),
};

export const TextareaAndCount = {
  name: 'Textarea & Char count',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row" style={{ gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <TextField variant="filled" label="Remarks" type="textarea" rows={3} placeholder="Any special requirements..." helperText="Optional" style={{ width: 300 }} />
      <TextField variant="filled" label="Feedback" type="textarea" rows={4} placeholder="Tell us about your journey..." maxLength={200} showCount style={{ width: 300 }} />
    </div>
  ),
};

export const InContext = {
  name: 'In Context — Booking search',
  parameters: { controls: { disable: true } },
  render: () => {
    const [from, setFrom] = useState('Bengaluru');
    const [to,   setTo]   = useState('');
    const [date, setDate] = useState('');
    return (
      <div style={{
        maxWidth: 540, background: 'var(--color-surface)',
        borderRadius: 'var(--shape-lg)',
        border: '1px solid var(--color-outline-variant)',
        padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-on-surface)' }}>
          Search Buses
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <TextField
            variant="filled" label="From" placeholder="Enter origin city"
            value={from} onChange={e => setFrom(e.target.value)}
            leadingIcon="trip_origin" clearable required fullWidth
          />
          <button style={{
            background: 'none', border: '1px solid var(--color-outline-variant)',
            borderRadius: '50%', width: 40, height: 40, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 20, flexShrink: 0, color: 'var(--color-primary)',
          }}>
            <span className="material-symbols-outlined">swap_horiz</span>
          </button>
          <TextField
            variant="filled" label="To" placeholder="Enter destination"
            value={to} onChange={e => setTo(e.target.value)}
            leadingIcon="place" clearable required fullWidth
            state={from && to && from === to ? 'error' : 'default'}
            errorText="Cannot be same as origin"
          />
        </div>
        <TextField
          variant="filled" label="Date of Journey" placeholder="DD / MM / YYYY"
          value={date} onChange={e => setDate(e.target.value)}
          leadingIcon="calendar_today" required fullWidth
          helperText="Tickets available up to 60 days in advance"
        />
        <button style={{
          background: 'var(--color-secondary)', color: 'var(--color-on-secondary)',
          border: 'none', borderRadius: 'var(--shape-full)', padding: '12px 24px',
          fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
          opacity: from && to && date ? 1 : .55,
        }}>
          Search Buses
        </button>
      </div>
    );
  },
};

export const Anatomy = {
  name: 'Anatomy',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col" style={{ maxWidth: 640 }}>
      <div style={{ border: '1px solid var(--color-outline-variant)', borderRadius: 12, padding: 24, background: 'var(--color-surface)' }}>
        <table style={{ fontSize: 12, borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
              {['Part', 'Token', 'Value'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '4px 12px 8px', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--color-on-surface-variant)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Background',       '--color-surface-container-high', '#ECE6F0 (light)'],
              ['Label',            '--color-primary',                '11px / 700 / uppercase'],
              ['Text',             '--color-on-surface',             '#1A1C1E'],
              ['Placeholder',      '--color-outline',                '#74777F'],
              ['Active indicator', '--color-primary',                '2px bottom border'],
              ['Error indicator',  '--color-error',                  '#B3261E'],
              ['Border radius',    '--shape-extra-sm',               '4px top only (filled)'],
              ['Height (md)',      '—',                              '40px'],
              ['Height (sm)',      '—',                              '32px'],
              ['Height (lg)',      '—',                              '48px'],
            ].map(([p, t, v]) => (
              <tr key={p} style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                <td style={{ padding: '6px 12px' }}>{p}</td>
                <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontSize: 11, color: 'var(--color-primary)' }}>{t}</td>
                <td style={{ padding: '6px 12px', color: 'var(--color-on-surface-variant)' }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};
