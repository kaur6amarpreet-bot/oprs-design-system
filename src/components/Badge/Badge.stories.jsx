import React from 'react';
import { Badge } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Notification indicator overlaid on an icon. Dot variant for unread alerts, count variant for numbered notifications.',
      },
    },
  },
};

export const AllVariants = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row" style={{ gap: 32 }}>
      <div>
        <div className="story-label">Dot</div>
        <Badge variant="dot">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>notifications</span>
        </Badge>
      </div>
      <div>
        <div className="story-label">Count 3</div>
        <Badge count={3}>
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>inbox</span>
        </Badge>
      </div>
      <div>
        <div className="story-label">Count overflow (99+)</div>
        <Badge count={112}>
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>mail</span>
        </Badge>
      </div>
      <div>
        <div className="story-label">On icon button</div>
        <Badge count={2}>
          <button className="icon-btn" aria-label="Cart">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </Badge>
      </div>
    </div>
  ),
};
