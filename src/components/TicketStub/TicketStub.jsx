import React from 'react';
import './TicketStub.css';

/**
 * KSRTC TicketStub
 * Displays a booking confirmation summary card.
 *
 * booking: {
 *   ticketNumber: string,
 *   from: string, to: string,
 *   departure: string, arrival: string,
 *   date: string,
 *   service: string,
 *   seats: string[] | string,
 *   fare: number | string,
 *   paxName: string,
 *   status: 'confirmed' | 'pending' | 'cancelled'
 * }
 */
export function TicketStub({ booking = {} }) {
  const {
    ticketNumber = 'OPRS000000',
    from = 'Bengaluru', to = 'Mysuru',
    departure = '06:30', arrival = '11:45',
    date = '12 Jun 2026',
    service = 'AIRAVAT CLUB CLASS',
    seats = ['14', '15'],
    fare = '₹ 1,798',
    paxName = 'Passenger',
    status = 'confirmed',
  } = booking;

  const seatList = Array.isArray(seats) ? seats.join(', ') : seats;

  const statusColors = {
    confirmed: { bg: 'var(--color-tertiary-container)', text: 'var(--color-on-tertiary-container)', icon: 'check_circle' },
    pending:   { bg: '#FFF9C4', text: '#F57F17', icon: 'pending' },
    cancelled: { bg: 'var(--color-error-container)', text: 'var(--color-on-error-container)', icon: 'cancel' },
  };
  const sc = statusColors[status] || statusColors.confirmed;

  return (
    <div className="ksrtc-ticket">
      {/* Header */}
      <div className="ksrtc-ticket__header">
        <div className="ksrtc-ticket__header-brand">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>directions_bus</span>
          <span>OPRS</span>
        </div>
        <span
          className="ksrtc-ticket__status"
          style={{ background: sc.bg, color: sc.text }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{sc.icon}</span>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Route */}
      <div className="ksrtc-ticket__route">
        <div className="ksrtc-ticket__city">
          <span className="ksrtc-ticket__city-name">{from}</span>
          <span className="ksrtc-ticket__time">{departure}</span>
        </div>
        <div className="ksrtc-ticket__route-arrow">
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
        <div className="ksrtc-ticket__city ksrtc-ticket__city--right">
          <span className="ksrtc-ticket__city-name">{to}</span>
          <span className="ksrtc-ticket__time">{arrival}</span>
        </div>
      </div>

      {/* Divider with perforations */}
      <div className="ksrtc-ticket__perforation" />

      {/* Details */}
      <div className="ksrtc-ticket__details">
        <div className="ksrtc-ticket__detail-row">
          <div className="ksrtc-ticket__detail">
            <span className="ksrtc-ticket__detail-label">Date</span>
            <span className="ksrtc-ticket__detail-value">{date}</span>
          </div>
          <div className="ksrtc-ticket__detail">
            <span className="ksrtc-ticket__detail-label">Service</span>
            <span className="ksrtc-ticket__detail-value">{service}</span>
          </div>
        </div>
        <div className="ksrtc-ticket__detail-row">
          <div className="ksrtc-ticket__detail">
            <span className="ksrtc-ticket__detail-label">Passenger</span>
            <span className="ksrtc-ticket__detail-value">{paxName}</span>
          </div>
          <div className="ksrtc-ticket__detail">
            <span className="ksrtc-ticket__detail-label">Seats</span>
            <span className="ksrtc-ticket__detail-value">{seatList}</span>
          </div>
        </div>
      </div>

      {/* Perforation + Ticket Number */}
      <div className="ksrtc-ticket__perforation" />
      <div className="ksrtc-ticket__stub">
        <div>
          <div className="ksrtc-ticket__stub-label">Ticket Number</div>
          <div className="ksrtc-ticket__stub-number">{ticketNumber}</div>
        </div>
        <div className="ksrtc-ticket__fare">
          <div className="ksrtc-ticket__stub-label">Total Fare</div>
          <div className="ksrtc-ticket__fare-amount">{fare}</div>
        </div>
      </div>
    </div>
  );
}

export default TicketStub;
