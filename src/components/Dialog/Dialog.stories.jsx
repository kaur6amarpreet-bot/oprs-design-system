import React, { useState } from 'react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Modal dialogs for critical decisions: cancellation confirmation, session expiry, seat already booked warnings.',
      },
    },
  },
};

export const CancelBooking = {
  name: 'Cancel Booking (Alert)',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>Cancel Booking</Button>
        <Dialog
          open={open}
          type="alert"
          icon="warning"
          title="Cancel This Booking?"
          onClose={() => setOpen(false)}
          actions={
            <>
              <Button variant="text" onClick={() => setOpen(false)}>Keep Booking</Button>
              <Button variant="filled-secondary" onClick={() => setOpen(false)}>Yes, Cancel</Button>
            </>
          }
        >
          This action cannot be undone. Cancellation charges may apply as per OPRS policy.
        </Dialog>
      </>
    );
  },
};

export const BookingConfirmed = {
  name: 'Booking Confirmed',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="filled" onClick={() => setOpen(true)}>Confirm Payment</Button>
        <Dialog
          open={open}
          type="confirm"
          icon="check_circle"
          title="Booking Confirmed!"
          onClose={() => setOpen(false)}
          actions={
            <Button variant="filled-success" onClick={() => setOpen(false)}>View Ticket</Button>
          }
        >
          Your ticket has been booked. Ticket number <strong>OPRS20240614</strong> has been sent to your registered mobile number.
        </Dialog>
      </>
    );
  },
};

export const SessionExpiry = {
  name: 'Session Expiry Warning',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="tonal" onClick={() => setOpen(true)}>Trigger Session Warning</Button>
        <Dialog
          open={open}
          type="alert"
          icon="timer"
          title="Session Expiring Soon"
          size="sm"
          onClose={() => setOpen(false)}
          actions={
            <>
              <Button variant="text" onClick={() => setOpen(false)}>Extend</Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>Sign Out</Button>
            </>
          }
        >
          Your booking session expires in 2 minutes. Your seat hold will be released.
        </Dialog>
      </>
    );
  },
};
