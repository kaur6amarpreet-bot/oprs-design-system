import React from 'react';
import { StatItem, StatGroup } from './StatItem';

export default {
  title: 'OPRS Specific/StatItem',
  component: StatItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Compact metric display used in the **search bar header** (top-right area). Shows a label + value pair — typically Ticket Number and Available Credit Balance.

Used in groups via \`<StatGroup>\` to display multiple stats side by side with a divider between them.

\`\`\`jsx
<StatGroup>
  <StatItem label="Ticket No."       value="0" />
  <StatItem label="Available Credit" value={1250} prefix="₹" variant="currency" />
</StatGroup>
\`\`\`
        `,
      },
    },
    backgrounds: { default: 'surface' },
    layout: 'padded',
  },
  argTypes: {
    label:   { control: 'text',   table: { category: 'Content' } },
    value:   { control: 'text',   table: { category: 'Content' } },
    prefix:  { control: 'text',   table: { category: 'Content' } },
    suffix:  { control: 'text',   table: { category: 'Content' } },
    icon:    { control: 'text',   table: { category: 'Content' } },
    variant: { control: 'radio',  options: ['default','currency','highlight'], table: { category: 'Appearance' } },
  },
};

export const Playground = {
  args: {
    label:   'Available Credit',
    value:   1250,
    prefix:  '₹',
    variant: 'currency',
    icon:    'account_balance_wallet',
  },
};

export const InSearchBar = {
  name: 'In Search Bar — paired stats',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col" style={{ gap: 24 }}>
      <div className="story-label">Standard search header usage (on surface)</div>
      <div style={{
        background: 'var(--color-surface-container-low)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 10,
        display: 'inline-flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <StatGroup>
          <StatItem
            label="Ticket No."
            value="0"
            icon="confirmation_number"
          />
          <StatItem
            label="Available Credit"
            value={1250}
            prefix="₹"
            variant="currency"
            icon="account_balance_wallet"
          />
        </StatGroup>
      </div>

      <div className="story-label">On dark/primary bar background</div>
      <div style={{
        background: 'var(--color-primary)',
        padding: '8px 16px',
        borderRadius: 10,
        display: 'inline-flex',
        gap: 0,
      }}>
        <StatItem label="Ticket No."      value="3"     variant="bar" />
        <StatItem label="Available Credit" value="₹ 1,250.00" variant="bar" />
      </div>
    </div>
  ),
};

export const AllVariants = {
  name: 'All variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row" style={{ gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div className="story-label">Default</div>
        <StatItem label="PNR Number" value="KA-2024061401" />
      </div>
      <div>
        <div className="story-label">Currency</div>
        <StatItem label="Total Fare" value={850} prefix="₹" variant="currency" />
      </div>
      <div>
        <div className="story-label">Highlight</div>
        <StatItem label="Seats Left" value="4" variant="highlight" />
      </div>
      <div>
        <div className="story-label">With icon</div>
        <StatItem label="Journey Date" value="14 Jun 2024" icon="calendar_today" />
      </div>
    </div>
  ),
};

export const MultipleStats = {
  name: 'StatGroup — booking confirmation',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{
      background: 'var(--color-surface-container-low)',
      border: '1px solid var(--color-outline-variant)',
      borderRadius: 12,
      display: 'inline-flex',
      overflow: 'hidden',
    }}>
      <StatGroup>
        <StatItem label="Booking ID"    value="OPRS240614"    icon="confirmation_number" />
        <StatItem label="Seats"         value="2"              icon="event_seat" />
        <StatItem label="Total Fare"    value={1700} prefix="₹" variant="currency" icon="payments" />
        <StatItem label="Journey Date"  value="14 Jun 2024"    icon="calendar_today" />
      </StatGroup>
    </div>
  ),
};
