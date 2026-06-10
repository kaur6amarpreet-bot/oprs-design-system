import React, { useState } from 'react';
import { Tabs } from './Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'MD3 Tabs for navigating between related views. Primary tabs with underline indicator for main sections; secondary for sub-filters.',
      },
    },
    backgrounds: { default: 'white' },
  },
};

export const Primary = {
  name: 'Primary Tabs',
  render: () => {
    const [tab, setTab] = useState('onward');
    return (
      <Tabs
        variant="primary"
        value={tab}
        onChange={setTab}
        tabs={[
          { label: 'Onward Buses', value: 'onward', icon: 'arrow_forward', badge: 14 },
          { label: 'Return Buses', value: 'return', icon: 'arrow_back',    badge: 8  },
        ]}
      />
    );
  },
};

export const Secondary = {
  name: 'Secondary Tabs (Sub-filter)',
  render: () => {
    const [tab, setTab] = useState('all');
    return (
      <Tabs
        variant="secondary"
        value={tab}
        onChange={setTab}
        tabs={[
          { label: 'All Classes', value: 'all' },
          { label: 'AC',          value: 'ac'  },
          { label: 'Non-AC',      value: 'non-ac' },
          { label: 'Sleeper',     value: 'sleeper' },
        ]}
      />
    );
  },
};

export const BookingHistory = {
  name: 'Booking History Tabs',
  render: () => {
    const [tab, setTab] = useState('upcoming');
    return (
      <Tabs
        variant="primary"
        value={tab}
        onChange={setTab}
        tabs={[
          { label: 'Upcoming',   value: 'upcoming',  icon: 'upcoming'      },
          { label: 'Completed',  value: 'completed', icon: 'task_alt'      },
          { label: 'Cancelled',  value: 'cancelled', icon: 'cancel'        },
        ]}
      />
    );
  },
};
