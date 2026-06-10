import React, { useState } from 'react';
import { SegmentedButton } from './SegmentedButton';

export default {
  title: 'Components/SegmentedButton',
  component: SegmentedButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Mutually exclusive options in a single row. Used for One-Way / Return / Trip Number booking mode and Upper / Lower berth toggles.',
      },
    },
  },
};

export const BookingMode = {
  name: 'Booking Mode (One-Way / Return / Trip)',
  render: () => {
    const [mode, setMode] = useState('one-way');
    return (
      <SegmentedButton
        options={[
          { label: 'One-Way',     value: 'one-way' },
          { label: 'Return Trip', value: 'return'  },
          { label: 'Trip Number', value: 'trip'    },
        ]}
        value={mode}
        onChange={setMode}
      />
    );
  },
};

export const BerthType = {
  name: 'Berth Type (Upper / Lower)',
  render: () => {
    const [berth, setBerth] = useState('lower');
    return (
      <SegmentedButton
        options={[
          { label: 'Upper', value: 'upper' },
          { label: 'Lower', value: 'lower' },
        ]}
        value={berth}
        onChange={setBerth}
      />
    );
  },
};

export const SortOptions = {
  name: 'Sort Options',
  render: () => {
    const [sort, setSort] = useState('departure');
    return (
      <SegmentedButton
        options={[
          { label: 'Departure', value: 'departure' },
          { label: 'Fare',      value: 'fare' },
          { label: 'Duration',  value: 'duration' },
        ]}
        value={sort}
        onChange={setSort}
      />
    );
  },
};
