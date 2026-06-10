import React from 'react';
import { DataTable } from './DataTable';
import { Button } from '../Button/Button';
import { Chip } from '../Chip/Chip';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Data table for displaying structured information. Supports sorting, row selection, grouping, loading skeletons, and two density modes.

Use for: bus service listings, booking history, passenger manifests, depot schedules.
        `,
      },
    },
    backgrounds: { default: 'surface' },
    layout: 'padded',
  },
  argTypes: {
    density:     { control: 'radio', options: ['comfortable','compact'], table: { category: 'Appearance' } },
    selectable:  { control: 'boolean', table: { category: 'Behaviour' } },
    loading:     { control: 'boolean', table: { category: 'Behaviour' } },
    stickyHeader:{ control: 'boolean', table: { category: 'Behaviour' } },
    columns:     { table: { disable: true } },
    rows:        { table: { disable: true } },
  },
};

const busCols = [
  { key: 'trip',      label: 'Trip No.',   width: 120, sortable: true },
  { key: 'service',   label: 'Service',    width: 180, sortable: true },
  { key: 'departure', label: 'Departure',  width: 90,  sortable: true, align: 'center' },
  { key: 'arrival',   label: 'Arrival',    width: 90,  align: 'center' },
  { key: 'seats',     label: 'Seats',      width: 70,  sortable: true, align: 'center',
    render: (v) => (
      <span style={{ fontWeight: 600, color: v > 10 ? 'var(--color-tertiary)' : v > 0 ? '#E65100' : 'var(--color-error)' }}>
        {v === 0 ? 'Full' : v}
      </span>
    )
  },
  { key: 'fare',      label: 'Adult Fare', width: 100, sortable: true, align: 'right',
    render: (v) => <span style={{ fontWeight: 600 }}>₹ {v}</span>
  },
  { key: 'class',     label: 'Type',       width: 80,  align: 'center',
    render: (v) => <Chip variant={v === 'AC' ? 'success' : 'assist'} style={{ fontSize: 11 }}>{v}</Chip>
  },
  { key: 'action',    label: '',           width: 88,  align: 'center',
    render: (_, row) => row.seats > 0
      ? <Button variant="filled-secondary" size="sm">Select</Button>
      : <Button variant="outlined" size="sm" disabled>Full</Button>
  },
];

const busRows = [
  { trip:'2100BNGMYS', service:'AIRAVAT CLUB CLASS',  departure:'06:30', arrival:'09:30', seats:14, fare:899,  class:'AC',    className:'AIRAVAT' },
  { trip:'2102BNGMYS', service:'RAJAHAMSA',            departure:'07:00', arrival:'11:00', seats:3,  fare:420,  class:'Non-AC', className:'RAJAHAMSA' },
  { trip:'2104BNGMYS', service:'AMBAARI UTSAV',       departure:'08:00', arrival:'11:00', seats:0,  fare:1200, class:'AC',    className:'AMBAARI' },
  { trip:'2106BNGMYS', service:'AIRAVAT GOLD CLASS',  departure:'09:30', arrival:'12:30', seats:22, fare:1050, class:'AC',    className:'AIRAVAT' },
  { trip:'2108BNGMYS', service:'NON AC EXPRESS',      departure:'10:00', arrival:'14:30', seats:18, fare:280,  class:'Non-AC', className:'NON AC' },
  { trip:'2110BNGMYS', service:'AIRAVAT CLUB CLASS',  departure:'13:00', arrival:'16:00', seats:9,  fare:899,  class:'AC',    className:'AIRAVAT' },
];

export const Playground = {
  args: { columns: busCols, rows: busRows, density: 'comfortable', selectable: false, loading: false },
};

export const Comfortable = {
  name: 'Comfortable density',
  render: () => <DataTable columns={busCols} rows={busRows} density="comfortable" />,
};

export const Compact = {
  name: 'Compact density',
  render: () => <DataTable columns={busCols} rows={busRows} density="compact" />,
};

export const Sortable = {
  name: 'Sortable columns',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-label">Click column headers to sort</div>
      <DataTable columns={busCols} rows={busRows} defaultSortKey="fare" defaultSortDir="asc" />
    </div>
  ),
};

export const WithSelection = {
  name: 'Row selection',
  parameters: { controls: { disable: true } },
  render: () => {
    const [sel, setSel] = React.useState([]);
    return (
      <div className="story-col">
        {sel.length > 0 && (
          <div style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 500 }}>
            {sel.length} row{sel.length > 1 ? 's' : ''} selected
          </div>
        )}
        <DataTable columns={busCols} rows={busRows} selectable onSelectionChange={setSel} />
      </div>
    );
  },
};

export const Grouped = {
  name: 'Grouped rows (by class type)',
  parameters: { controls: { disable: true } },
  render: () => (
    <DataTable
      columns={busCols.slice(0, 7)}
      rows={busRows}
      groupKey="className"
      density="comfortable"
    />
  ),
};

export const Loading = {
  name: 'Loading state',
  parameters: { controls: { disable: true } },
  render: () => <DataTable columns={busCols} rows={[]} loading />,
};

export const EmptyState = {
  name: 'Empty state',
  parameters: { controls: { disable: true } },
  render: () => (
    <DataTable
      columns={busCols}
      rows={[]}
      emptyMessage="No buses available for this route on the selected date."
    />
  ),
};

const bookingCols = [
  { key: 'pnr',      label: 'PNR',       width: 130, sortable: true },
  { key: 'route',    label: 'Route',      width: 160 },
  { key: 'date',     label: 'Date',       width: 100, sortable: true },
  { key: 'seats',    label: 'Seats',      width: 70,  align: 'center' },
  { key: 'fare',     label: 'Fare',       width: 90,  align: 'right', render: v => <strong>₹ {v}</strong> },
  { key: 'status',   label: 'Status',     width: 100, align: 'center',
    render: v => (
      <Chip variant={v === 'Confirmed' ? 'success' : v === 'Pending' ? 'assist' : 'assist'} style={{ fontSize: 11 }}>{v}</Chip>
    )
  },
];

const bookingRows = [
  { pnr:'OPRS20240614', route:'BLR → MYS', date:'14 Jun 2026', seats:'14A', fare:899,  status:'Confirmed' },
  { pnr:'OPRS20240610', route:'BLR → HBL', date:'10 Jun 2026', seats:'21,22', fare:2600, status:'Cancelled' },
  { pnr:'OPRS20240615', route:'MYS → BLR', date:'15 Jun 2026', seats:'7',   fare:420,  status:'Pending' },
];

export const BookingHistory = {
  name: 'Booking History',
  parameters: { controls: { disable: true } },
  render: () => (
    <DataTable columns={bookingCols} rows={bookingRows} density="comfortable" />
  ),
};
