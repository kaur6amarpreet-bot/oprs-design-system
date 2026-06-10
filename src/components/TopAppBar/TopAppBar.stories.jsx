import React from 'react';
import { TopAppBar } from './TopAppBar';
import { Button } from '../Button/Button';

export default {
  title: 'Components/TopAppBar',
  component: TopAppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Primary navigation bar in OPRS blue. Sticky at top. Holds brand identity, navigation, and contextual actions.',
      },
    },
  },
};

export const Default = {
  args: {
    title: 'OPRS',
    subtitle: 'Online Passenger Reservation System',
  },
};

export const WithBackButton = {
  name: 'With Back Navigation',
  render: () => (
    <TopAppBar
      title="Bengaluru → Mysuru"
      subtitle="Mon, 12 Jun 2026 · 1 Adult"
      leadingIcon="arrow_back"
      onLeadingClick={() => alert('Go back')}
      trailingItems={
        <>
          <div className="divider" />
          <span className="counter-chip">14 buses found</span>
        </>
      }
    />
  ),
};

export const WithActions = {
  name: 'With Trailing Actions',
  render: () => (
    <TopAppBar
      title="OPRS Bus Booking"
      trailingItems={
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Button variant="icon" icon="help_outline" aria-label="Help" style={{ color: '#fff' }} />
          <Button variant="icon" icon="account_circle" aria-label="Profile" style={{ color: '#fff' }} />
        </div>
      }
    />
  ),
};
