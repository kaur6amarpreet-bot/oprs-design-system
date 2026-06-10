import React from 'react';
import { FareSummary } from './FareSummary';

export default {
  title: 'OPRS Specific/FareSummary',
  component: FareSummary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Fare breakdown card used in the **Passenger Details** section before payment. Shows all charge components, total, and optionally the passenger's wallet/credit balance.

Line types:
- \`base\` — default, black text
- \`deduction\` — shown in green (concessions, discounts)
- \`tax\` — smaller muted text (GST, surcharges)
- \`subtotal\` — bold, used to group sub-totals
        `,
      },
    },
    backgrounds: { default: 'surface' },
    layout: 'padded',
  },
  argTypes: {
    title:    { control: 'text',    table: { category: 'Content' } },
    total:    { control: 'number',  table: { category: 'Content' } },
    balance:  { control: 'number',  table: { category: 'Content' } },
    compact:  { control: 'boolean', table: { category: 'Appearance' } },
    lines:    { table: { disable: true } },
  },
};

const STANDARD_LINES = [
  { label: 'Reservation Fee',         amount: 800,   type: 'base'      },
  { label: 'Concessions',             amount: -50,   type: 'deduction' },
  { label: 'ARF + UF + TF + EF + BF', amount: 62,   type: 'base'      },
  { label: 'GST (5%)',                amount: 38,    type: 'tax'       },
];

export const Playground = {
  args: {
    lines:   STANDARD_LINES,
    total:   850,
    balance: 1250.00,
    title:   'Fare Summary',
    compact: false,
  },
};

export const StandardFare = {
  name: 'Standard — Airavat Club Class',
  parameters: { controls: { disable: true } },
  render: () => (
    <FareSummary
      lines={STANDARD_LINES}
      total={850}
      balance={1250.00}
    />
  ),
};

export const WithConcessions = {
  name: 'With multiple concessions',
  parameters: { controls: { disable: true } },
  render: () => (
    <FareSummary
      lines={[
        { label: 'Reservation Fee',          amount: 1200,   type: 'base'      },
        { label: 'Senior Citizen Concession', amount: -120,  type: 'deduction' },
        { label: 'Promo Code (OPRS10)',      amount: -60,   type: 'deduction' },
        { label: 'ARF + UF + TF',            amount: 80,    type: 'base'      },
        { label: 'GST (5%)',                 amount: 55,    type: 'tax'       },
      ]}
      total={1155}
      balance={500}
    />
  ),
};

export const NoBalance = {
  name: 'Without balance row',
  parameters: { controls: { disable: true } },
  render: () => (
    <FareSummary
      lines={STANDARD_LINES}
      total={850}
    />
  ),
};

export const Compact = {
  name: 'Compact — inline summary',
  parameters: { controls: { disable: true } },
  render: () => (
    <FareSummary
      lines={STANDARD_LINES}
      total={850}
      compact
    />
  ),
};

export const InContext = {
  name: 'In Context — passenger details sidebar',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{
      display: 'flex',
      gap: 24,
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    }}>
      {/* Simulated passenger form */}
      <div style={{
        flex: '1 1 300px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 12,
        padding: 20,
      }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: 'var(--color-on-surface)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Passenger 1
        </div>
        {[['Name', 'Ramesh Kumar'], ['Age', '34'], ['Mobile', '+91 98765 43210']].map(([l, v]) => (
          <div key={l} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-on-surface-variant)', marginBottom: 4 }}>{l}</div>
            <div style={{
              height: 40, background: 'var(--color-surface-container-high)',
              borderRadius: '4px 4px 0 0', borderBottom: '2px solid var(--color-outline)',
              padding: '0 12px', display: 'flex', alignItems: 'center',
              fontSize: 14, color: 'var(--color-on-surface)',
            }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      {/* Fare summary */}
      <div style={{ flex: '0 0 280px' }}>
        <FareSummary
          lines={STANDARD_LINES}
          total={850}
          balance={1250.00}
        />
      </div>
    </div>
  ),
};
