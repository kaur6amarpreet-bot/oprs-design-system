import React from 'react';
import { SectionHeader, SectionSubheader, HeadlineBar } from './SectionHeader';
import { Button } from '../Button/Button';

export default {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Three header primitives used to label and divide content sections throughout the booking flow.

| Component | Role | Background |
|---|---|---|
| \`SectionHeader\` | Labels a major section (bus list, seat map) | Primary blue |
| \`SectionSubheader\` | Secondary info bar below a header | Surface container |
| \`HeadlineBar\` | Above result grids — shows route + meta | Primary container |
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm','md','lg'] },
    icon: { control: 'text' },
    title: { control: 'text' },
  },
};

export const Playground = {
  args: { title: 'Available Buses', icon: 'directions_bus', size: 'md' },
};

export const AllVariants = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col" style={{ gap: 0 }}>

      <div className="story-section" style={{ marginBottom: 32 }}>
        <h3 style={{ paddingLeft: 16 }}>SectionHeader — sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SectionHeader title="Small Header" icon="info" size="sm" />
          <SectionHeader title="Medium Header (default)" icon="directions_bus" size="md" />
          <SectionHeader title="Large Header" icon="event_seat" size="lg" />
        </div>
      </div>

      <div className="story-section" style={{ marginBottom: 32 }}>
        <h3 style={{ paddingLeft: 16 }}>SectionHeader — with actions</h3>
        <SectionHeader
          title="Onward Journey"
          icon="arrow_forward"
          actions={
            <>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,.8)' }}>14 buses found</span>
              <Button variant="icon" icon="filter_list" aria-label="Filter" style={{ color: '#fff' }} />
            </>
          }
        />
      </div>

      <div className="story-section" style={{ marginBottom: 32 }}>
        <h3 style={{ paddingLeft: 16 }}>SectionSubheader</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SectionSubheader>
            Showing buses from <strong>Bengaluru</strong> to <strong>Mysuru</strong>
          </SectionSubheader>
          <SectionSubheader actions={<Button variant="text" size="sm" style={{ color: 'var(--color-primary)' }}>Clear filters</Button>}>
            Filtered by: <strong>AC Sleeper</strong> · <strong>Departure after 6:00 AM</strong>
          </SectionSubheader>
        </div>
      </div>

      <div className="story-section" style={{ marginBottom: 32 }}>
        <h3 style={{ paddingLeft: 16 }}>HeadlineBar</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <HeadlineBar icon="search" title="Search Results" meta="Mon, 12 Jun 2026" />
          <HeadlineBar icon="event_seat" title="Select Seats" meta="AIRAVAT CLUB CLASS · 06:30" />
          <HeadlineBar icon="person" title="Passenger Details" />
        </div>
      </div>

      <div className="story-section">
        <h3 style={{ paddingLeft: 16 }}>In context — full section</h3>
        <div style={{ border: '1px solid var(--color-outline-variant)', borderRadius: 12, overflow: 'hidden' }}>
          <SectionHeader title="Available Buses" icon="directions_bus" actions={<span style={{ fontSize: 12, color: 'rgba(255,255,255,.8)' }}>14 results</span>} />
          <SectionSubheader actions={<Button variant="text" size="sm" style={{ color: 'var(--color-primary)' }}>Clear</Button>}>
            <strong>Bengaluru → Mysuru</strong> · Mon 12 Jun · 1 Adult
          </SectionSubheader>
          <div style={{ padding: '16px', background: 'var(--color-surface)', color: 'var(--color-on-surface-variant)', fontSize: 13, textAlign: 'center' }}>
            Bus list content goes here
          </div>
        </div>
      </div>

    </div>
  ),
};
