import React, { useState, useEffect } from 'react';
import { LinearProgress, CircularProgress } from './Progress';

export default {
  title: 'Components/Progress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Progress indicators for loading states — bus list loading, seat availability fetching, booking processing.',
      },
    },
  },
};

export const Linear = {
  name: 'Linear Progress',
  parameters: { controls: { disable: true } },
  render: () => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setVal(v => v >= 100 ? 0 : v + 5), 200);
      return () => clearInterval(t);
    }, []);
    return (
      <div className="story-col" style={{ maxWidth: 400 }}>
        <div><div className="story-label">Determinate ({val}%)</div><LinearProgress value={val} /></div>
        <div><div className="story-label">Indeterminate (loading buses...)</div><LinearProgress /></div>
      </div>
    );
  },
};

export const Circular = {
  name: 'Circular Progress',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row">
      <div><div className="story-label">Indeterminate SM</div><CircularProgress size="sm" /></div>
      <div><div className="story-label">Indeterminate MD</div><CircularProgress size="md" /></div>
      <div><div className="story-label">Indeterminate LG</div><CircularProgress size="lg" /></div>
      <div><div className="story-label">Determinate 65%</div><CircularProgress value={65} size="md" /></div>
      <div><div className="story-label">Determinate 100%</div><CircularProgress value={100} size="md" /></div>
    </div>
  ),
};
