import React, { useState } from 'react';
import { NavigationDrawer } from './NavigationDrawer';

export default {
  title: 'OPRS Specific/NavigationDrawer',
  component: NavigationDrawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Modal side navigation for the OPRS app. Opens from the left, slides in over a backdrop. Groups nav items into accordion sections.

**Structure from the prototype:**
- Ticket Booking → Book Ticket, Check PNR
- Current Booking → My Tickets, Cancel Ticket
- Block Seats → Block, Unblock
- Link Ticket

Opened via the hamburger icon in TopAppBar. Closes via backdrop click, close button, or Escape key.
        `,
      },
    },
    backgrounds: { default: 'surface' },
    layout: 'fullscreen',
  },
  argTypes: {
    open:      { control: 'boolean', table: { category: 'Behaviour' } },
    userLabel: { control: 'text',    table: { category: 'Content' } },
    userSub:   { control: 'text',    table: { category: 'Content' } },
    items:     { table: { disable: true } },
    onClose:   { table: { disable: true } },
  },
};

const NAV_ITEMS = [
  {
    label: 'Ticket Booking',
    icon: 'confirmation_number',
    children: [
      { label: 'Book Ticket',    icon: 'add_circle',    active: true  },
      { label: 'Check PNR',     icon: 'search',         active: false },
    ],
  },
  {
    label: 'Current Booking',
    icon: 'receipt_long',
    children: [
      { label: 'My Tickets',    icon: 'local_activity', active: false },
      { label: 'Cancel Ticket', icon: 'cancel',         active: false },
    ],
  },
  {
    label: 'Block Seats',
    icon: 'event_seat',
    children: [
      { label: 'Block Seats',   icon: 'block',          active: false },
      { label: 'Unblock Seats', icon: 'lock_open',      active: false },
    ],
  },
  {
    label: 'Link Ticket',
    icon: 'link',
    children: [
      { label: 'Link Ticket',   icon: 'add_link',       active: false },
    ],
  },
];

// Live demo wrapper — needs open/close state
function DrawerDemo({ userLabel, userSub }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: '1px solid var(--color-outline-variant)',
          borderRadius: 8, padding: '10px 16px', cursor: 'pointer',
          fontFamily: 'var(--font-family-base)', fontSize: 14,
          color: 'var(--color-on-surface)',
        }}
      >
        <span className="material-symbols-outlined">menu</span>
        Open Navigation Drawer
      </button>
      <NavigationDrawer
        open={open}
        onClose={() => setOpen(false)}
        items={NAV_ITEMS}
        userLabel={userLabel}
        userSub={userSub}
      />
    </div>
  );
}

export const Playground = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    userLabel: 'Ramesh Kumar',
    userSub:   'ramesh.k@example.com',
  },
};

export const Default = {
  name: 'Open — all groups',
  parameters: { controls: { disable: true } },
  render: () => <DrawerDemo userLabel="Ramesh Kumar" userSub="ramesh.k@example.com" />,
};

export const GuestUser = {
  name: 'Guest user state',
  parameters: { controls: { disable: true } },
  render: () => <DrawerDemo userLabel="Guest User" userSub="Sign in to manage bookings" />,
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
              {['Part', 'Description'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '4px 12px 8px', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--color-on-surface-variant)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Header',          'Brand logo + name, close button'],
              ['User row',        'Avatar icon, user name, sub label (email or sign-in prompt)'],
              ['Group trigger',   'Accordion button — icon, label, chevron. Toggles sub-items.'],
              ['Sub-item',        '13px, active state uses secondary-container background + indicator dot'],
              ['Backdrop',        'Semi-transparent overlay; click closes drawer'],
              ['Footer',          'Help & Support, Sign Out — always visible at bottom'],
            ].map(([p, d]) => (
              <tr key={p} style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                <td style={{ padding: '6px 12px', fontWeight: 600 }}>{p}</td>
                <td style={{ padding: '6px 12px', color: 'var(--color-on-surface-variant)' }}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};
