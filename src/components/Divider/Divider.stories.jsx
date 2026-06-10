import React from 'react';
import { Divider } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export const AllVariants = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div><div className="story-label">Full</div><Divider variant="full" /></div>
      <div><div className="story-label">Inset (left-indented)</div><Divider variant="inset" /></div>
      <div><div className="story-label">Middle (both sides)</div><Divider variant="middle" /></div>
      <div>
        <div className="story-label">Vertical</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 40 }}>
          <span>Bengaluru</span>
          <Divider orientation="vertical" />
          <span>Mysuru</span>
        </div>
      </div>
    </div>
  ),
};
