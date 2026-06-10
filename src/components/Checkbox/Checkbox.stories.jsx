import React, { useState } from 'react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'MD3-style checkbox. Used for Single Lady passenger toggle, filter options, and Terms & Conditions acceptance.',
      },
    },
  },
};

export const Playground = {
  args: { label: 'Single Lady Passenger', checked: false },
};

export const AllStates = {
  name: 'All States',
  parameters: { controls: { disable: true } },
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="story-col">
        <div className="story-row">
          <div>
            <div className="story-label">Unchecked</div>
            <Checkbox label="AC Sleeper" />
          </div>
          <div>
            <div className="story-label">Checked</div>
            <Checkbox label="Single Lady" checked onChange={() => {}} />
          </div>
          <div>
            <div className="story-label">Indeterminate</div>
            <Checkbox label="Select All Classes" indeterminate onChange={() => {}} />
          </div>
          <div>
            <div className="story-label">Disabled Unchecked</div>
            <Checkbox label="Unavailable" disabled />
          </div>
          <div>
            <div className="story-label">Disabled Checked</div>
            <Checkbox label="Auto-assigned" checked disabled onChange={() => {}} />
          </div>
        </div>
        <div className="story-section">
          <h3>Interactive</h3>
          <Checkbox
            label="Single Lady Passenger"
            helperText="Shows seats reserved for women travellers"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>
      </div>
    );
  },
};

export const FilterGroup = {
  name: 'Filter Group',
  parameters: { controls: { disable: true } },
  render: () => {
    const options = ['AIRAVAT CLUB CLASS', 'RAJAHAMSA', 'AMBAARI UTSAV', 'NON AC SLEEPER'];
    const [selected, setSelected] = useState(options);
    const toggle = (v) => setSelected(prev =>
      prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]
    );
    const allChecked = selected.length === options.length;
    const someChecked = selected.length > 0 && !allChecked;
    return (
      <div className="story-col">
        <Checkbox
          label="All Classes"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={() => setSelected(allChecked ? [] : [...options])}
        />
        <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {options.map(o => (
            <Checkbox key={o} label={o} checked={selected.includes(o)} onChange={() => toggle(o)} />
          ))}
        </div>
      </div>
    );
  },
};
