import React, { useState } from 'react';
import { Toggle } from './Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'MD3 Switch component. Use for binary on/off settings: notifications, filters, accessibility options.',
      },
    },
  },
};

export const Playground = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Toggle label="Show Ladies Seats Only" checked={on} onChange={e => setOn(e.target.checked)} />;
  },
};

export const AllStates = {
  name: 'All States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-row">
        <div><div className="story-label">Off</div><Toggle label="SMS Alerts" checked={false} onChange={() => {}} /></div>
        <div><div className="story-label">On</div><Toggle label="Email Ticket" checked={true} onChange={() => {}} /></div>
        <div><div className="story-label">Disabled Off</div><Toggle label="Push Notifications" disabled checked={false} onChange={() => {}} /></div>
        <div><div className="story-label">Disabled On</div><Toggle label="Auto-refund" disabled checked={true} onChange={() => {}} /></div>
      </div>
    </div>
  ),
};
