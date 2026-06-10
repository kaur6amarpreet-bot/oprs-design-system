import React from 'react';
import { TicketStub } from './TicketStub';

export default {
  title: 'OPRS Specific/TicketStub',
  component: TicketStub,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<span class="ds-status ds-status--stable">● Stable</span>

Booking confirmation card shown after successful payment. The dashed border references a physical bus ticket. Visual cues follow real-world ticket conventions:

- **Green ticket number** = confirmed and valid
- **Dashed border** = tear-along perforation of a paper ticket
- **Status chip** changes colour: green (confirmed), amber (pending), red (cancelled)

The component is read-only — it displays booking data, does not accept user input.
        `,
      },
    },
    backgrounds: { default: 'canvas' },
  },
  argTypes: {
    booking: { table: { disable: true } },
  },
};

export const Confirmed = {
  name: 'Confirmed',
  render: () => (
    <TicketStub booking={{
      ticketNumber: 'OPRS20240614',
      from:'Bengaluru', to:'Mysuru',
      departure:'06:30', arrival:'09:30',
      date:'14 Jun 2026',
      service:'AIRAVAT CLUB CLASS',
      seats:['14A','14B'],
      fare:'₹ 1,798',
      paxName:'Amarpreet Kaur',
      status:'confirmed',
    }} />
  ),
};

export const Pending = {
  name: 'Pending',
  render: () => (
    <TicketStub booking={{
      ticketNumber: 'OPRS20240615',
      from:'Mysuru', to:'Bengaluru',
      departure:'20:00', arrival:'23:30',
      date:'15 Jun 2026',
      service:'RAJAHAMSA',
      seats:['7'],
      fare:'₹ 420',
      paxName:'Ravi Kumar',
      status:'pending',
    }} />
  ),
};

export const Cancelled = {
  name: 'Cancelled',
  render: () => (
    <TicketStub booking={{
      ticketNumber: 'OPRS20240610',
      from:'Bengaluru', to:'Hubli',
      departure:'22:00', arrival:'06:00',
      date:'10 Jun 2026',
      service:'AMBAARI UTSAV',
      seats:['21','22'],
      fare:'₹ 2,600',
      paxName:'Priya S.',
      status:'cancelled',
    }} />
  ),
};

export const ReturnPair = {
  name: 'Return Journey Pair',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <div className="story-section">
        <h3>Onward + Return displayed together</h3>
        <div className="story-row" style={{ flexWrap:'wrap', alignItems:'flex-start' }}>
          <TicketStub booking={{ ticketNumber:'OPRS24A614', from:'Bengaluru', to:'Mysuru', departure:'06:30', arrival:'09:30', date:'14 Jun 2026', service:'AIRAVAT CLUB CLASS', seats:['14A'], fare:'₹ 899', paxName:'Amarpreet Kaur', status:'confirmed' }} />
          <TicketStub booking={{ ticketNumber:'OPRS24R616', from:'Mysuru', to:'Bengaluru', departure:'18:00', arrival:'21:30', date:'16 Jun 2026', service:'AIRAVAT CLUB CLASS', seats:['8B'], fare:'₹ 899', paxName:'Amarpreet Kaur', status:'confirmed' }} />
        </div>
      </div>
    </div>
  ),
};

export const AllStatuses = {
  name: 'All Status States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row" style={{ flexWrap:'wrap', alignItems:'flex-start' }}>
      {['confirmed','pending','cancelled'].map(s => (
        <div key={s}>
          <div className="story-label">{s.charAt(0).toUpperCase()+s.slice(1)}</div>
          <TicketStub booking={{ ticketNumber:`KSRTC-${s.toUpperCase().slice(0,3)}`, from:'BLR', to:'MYS', departure:'06:30', arrival:'09:30', date:'14 Jun 2026', service:'AIRAVAT', seats:['14'], fare:'₹ 899', paxName:'Passenger', status:s }} />
        </div>
      ))}
    </div>
  ),
};
