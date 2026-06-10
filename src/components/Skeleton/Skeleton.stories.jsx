import React from 'react';
import { Skeleton, BusRowSkeleton } from './Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Loading placeholders that prevent layout shift. Match the shape and size of the actual content.',
      },
    },
    backgrounds: { default: 'white' },
  },
};

export const Shapes = {
  name: 'All Shapes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div><div className="story-label">Text (1 line)</div><Skeleton shape="text" /></div>
      <div><div className="story-label">Text (3 lines)</div><Skeleton shape="text" lines={3} /></div>
      <div><div className="story-label">Rect</div><Skeleton shape="rect" height={80} /></div>
      <div><div className="story-label">Circle 40px</div><Skeleton shape="circle" /></div>
    </div>
  ),
};

export const BusListLoading = {
  name: 'Bus List Loading State',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 700 }}>
      {[...Array(5)].map((_, i) => <BusRowSkeleton key={i} />)}
    </div>
  ),
};
