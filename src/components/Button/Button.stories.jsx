import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'surface' },
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

OPRS uses three main button roles. One primary action per screen, never competing CTAs.

| Variant | Class | Role | When to use |
|---|---|---|---|
| \`filled-secondary\` | **Primary** | Highest emphasis | Book, Select bus, Proceed to payment |
| \`outlined\` | **Secondary** | Medium emphasis | Back, Cancel, View details |
| \`text\` | **Tertiary** | Low emphasis | Learn more, Clear filters, inline links |
| \`filled-success\` | **Confirm** | Confirmation only | Confirm booking, Verify OTP |
| \`tonal\` | **Tonal** | Surface-level mid-weight | Tags, filter toggles |
| \`icon\` / \`fab\` | **Icon** | Compact actions | Swap, Add |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      table: { category: 'Appearance' },
      control: 'select',
      options: ['filled-secondary', 'outlined', 'text', 'tonal', 'filled-success', 'icon', 'fab'],
      description: 'Visual weight and colour role.',
    },
    size: {
      table: { category: 'Appearance' },
      control: 'radio',
      options: ['default', 'sm'],
      description: '`default` = 40px. `sm` = 32px — for table rows and filter bars.',
    },
    fullWidth: {
      table: { category: 'Appearance' },
      control: 'boolean',
    },
    children: {
      table: { category: 'Content' },
      control: 'text',
      description: 'Button label text.',
    },
    icon: {
      table: { category: 'Content' },
      control: 'text',
      description: 'Material Symbol name.',
    },
    iconPosition: {
      table: { category: 'Content' },
      control: 'radio',
      options: ['start', 'end'],
    },
    disabled: {
      table: { category: 'Behaviour' },
      control: 'boolean',
    },
    type: {
      table: { category: 'Behaviour' },
      control: 'radio',
      options: ['button', 'submit', 'reset'],
    },
    onClick: { table: { disable: true } },
  },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  args: {
    variant: 'filled-secondary',
    children: 'Search Buses',
    icon: 'search',
    iconPosition: 'start',
    size: 'default',
    disabled: false,
    fullWidth: false,
  },
};

// ── All Variants ──────────────────────────────────────────
export const AllVariants = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">

      <div className="story-section">
        <h3>Button hierarchy</h3>
        <div className="story-row story-row--center">
          {[
            { v: 'filled-secondary', l: 'Primary',   note: 'Main CTA · Orange' },
            { v: 'outlined',         l: 'Secondary',  note: 'Back / Cancel · Blue border' },
            { v: 'tonal',            l: 'Tonal',      note: 'Mid-weight' },
            { v: 'text',             l: 'Tertiary',   note: 'Low emphasis' },
            { v: 'filled-success',   l: 'Confirm',    note: 'Confirmation only' },
          ].map(b => (
            <div key={b.v} style={{ textAlign: 'center' }}>
              <div className="story-label">{b.note}</div>
              <Button variant={b.v}>{b.l}</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="story-section">
        <h3>With icons</h3>
        <div className="story-row story-row--center">
          <Button variant="filled-secondary" icon="search"       iconPosition="start">Search Buses</Button>
          <Button variant="filled-secondary" icon="event_seat"   iconPosition="start">Select Seat</Button>
          <Button variant="outlined"         icon="arrow_back"   iconPosition="start">Back</Button>
          <Button variant="outlined"         icon="close"        iconPosition="start">Cancel</Button>
          <Button variant="text"             icon="arrow_forward" iconPosition="end">Continue</Button>
        </div>
      </div>

      <div className="story-section">
        <h3>Small — table rows, filter bars</h3>
        <div className="story-row story-row--center">
          <Button variant="filled-secondary" size="sm">Select</Button>
          <Button variant="outlined"         size="sm">Details</Button>
          <Button variant="tonal"            size="sm" icon="tune">Filters</Button>
          <Button variant="text"             size="sm">Clear all</Button>
        </div>
      </div>

      <div className="story-section">
        <h3>Icon Button &amp; FAB</h3>
        <div className="story-row story-row--center">
          <div style={{ textAlign: 'center' }}>
            <div className="story-label">Icon button</div>
            <Button variant="icon" icon="swap_horiz" aria-label="Swap" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="story-label">FAB</div>
            <Button variant="fab" icon="add" aria-label="New booking" />
          </div>
        </div>
      </div>

      <div className="story-section">
        <h3>Full width</h3>
        <div style={{ maxWidth: 360 }}>
          <Button variant="filled-secondary" fullWidth>Proceed to Payment</Button>
        </div>
      </div>

      <div className="story-section">
        <h3>Disabled states</h3>
        <div className="story-row story-row--center">
          <Button variant="filled-secondary" disabled>Primary</Button>
          <Button variant="outlined"         disabled>Secondary</Button>
          <Button variant="text"             disabled>Text</Button>
          <Button variant="icon"             disabled icon="search" aria-label="Search" />
        </div>
      </div>

    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────
export const Sizes = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row story-row--center" style={{ gap: 24, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="story-label">Default — 40px</div>
        <Button variant="filled-secondary">Book Now</Button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div className="story-label">Small — 32px</div>
        <Button variant="filled-secondary" size="sm">Select</Button>
      </div>
    </div>
  ),
};

// ── Usage Guidelines ──────────────────────────────────────
export const UsageGuidelines = {
  name: 'Usage Guidelines',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col" style={{ maxWidth: 700 }}>

      <div className="story-section">
        <h3>One primary CTA per context</h3>
        <div className="ds-do-dont">
          <div className="ds-do">
            <div className="ds-do__header">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span> Do
            </div>
            <div className="ds-do__body">
              <div className="story-row story-row--center">
                <Button variant="filled-secondary">Select</Button>
                <Button variant="outlined">View Details</Button>
              </div>
              <p className="ds-do__note">One orange primary per row. Outlined secondary for the alternative action.</p>
            </div>
          </div>
          <div className="ds-dont">
            <div className="ds-dont__header">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span> Don't
            </div>
            <div className="ds-dont__body">
              <div className="story-row story-row--center">
                <Button variant="filled-secondary">Select</Button>
                <Button variant="filled-secondary">Details</Button>
              </div>
              <p className="ds-dont__note">Never two orange buttons together — no hierarchy, confusing for users.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section">
        <h3>Accessibility</h3>
        <div style={{ background: '#F8FAFF', border: '1px solid #D6E4FF', borderRadius: 10, padding: '14px 18px' }}>
          <ul style={{ fontSize: 13, color: '#44464F', lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
            <li><span className="ds-prop">variant="icon"</span> and <span className="ds-prop">variant="fab"</span> must have <span className="ds-prop">aria-label</span>.</li>
            <li>All buttons are keyboard-focusable. Focus ring uses <span className="ds-prop">--color-primary</span>.</li>
            <li>Minimum touch target: 40×40px (icon buttons), 40px height (standard).</li>
            <li>Disabled buttons have <span className="ds-prop">disabled</span> attribute — removed from tab order.</li>
          </ul>
        </div>
      </div>

    </div>
  ),
};

// ── In Context ────────────────────────────────────────────
export const InContext = {
  name: 'In Context',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col" style={{ maxWidth: 640 }}>
      <div className="story-section">
        <h3>Bus result row</h3>
        <div style={{
          background: '#fff', border: '1px solid var(--color-outline-variant)',
          borderRadius: 12, padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>AIRAVAT CLUB CLASS</div>
            <div style={{ fontSize: 13, color: '#74777F', marginTop: 2 }}>06:30 → 09:30 · 14 seats · ₹ 899</div>
          </div>
          <Button variant="filled-secondary" size="sm">Select</Button>
        </div>
      </div>
      <div className="story-section">
        <h3>Booking action bar</h3>
        <div style={{
          background: '#fff', borderTop: '1px solid var(--color-outline-variant)',
          padding: '16px 20px', display: 'flex', justifyContent: 'flex-end', gap: 12, borderRadius: 12,
        }}>
          <Button variant="outlined">Back</Button>
          <Button variant="filled-success" icon="check" iconPosition="start">Confirm Booking</Button>
        </div>
      </div>
    </div>
  ),
};
