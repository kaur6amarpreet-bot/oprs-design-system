import React from 'react';
import { Card } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Surface containers for grouping related content. Elevated is the default. Outlined for form sections. Filled for summary panels.',
      },
    },
  },
  argTypes: {
    variant:  { control: 'select', options: ['elevated', 'outlined', 'filled', 'default'] },
    padding:  { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
};

export const Playground = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: 'Card content goes here.',
  },
};

export const AllVariants = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row" style={{ alignItems: 'flex-start' }}>
      <div>
        <div className="story-label">Elevated</div>
        <Card variant="elevated" style={{ width: 220 }}>
          <p style={{ fontSize: 14, color: 'var(--color-on-surface)' }}>
            Bus details, fare summaries, search panels.
          </p>
        </Card>
      </div>
      <div>
        <div className="story-label">Outlined</div>
        <Card variant="outlined" style={{ width: 220 }}>
          <p style={{ fontSize: 14, color: 'var(--color-on-surface)' }}>
            Form sections, filter panels, secondary containers.
          </p>
        </Card>
      </div>
      <div>
        <div className="story-label">Filled</div>
        <Card variant="filled" style={{ width: 220 }}>
          <p style={{ fontSize: 14, color: 'var(--color-on-surface)' }}>
            Background panels, table wrappers.
          </p>
        </Card>
      </div>
    </div>
  ),
};

export const WithContent = {
  name: 'With Real Content',
  parameters: { controls: { disable: true } },
  render: () => (
    <Card variant="elevated" style={{ width: 320 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-on-surface)' }}>AIRAVAT CLUB CLASS</div>
          <div style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', marginTop: 2 }}>AC Seater · 2+1</div>
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-primary)' }}>₹899</span>
      </div>
      <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--color-on-surface-variant)' }}>
        <span>🕐 06:30 → 11:45</span>
        <span>14 seats</span>
      </div>
    </Card>
  ),
};
