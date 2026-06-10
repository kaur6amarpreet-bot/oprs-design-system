import React, { useState } from 'react';
import { Snackbar } from './Snackbar';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Temporary notification messages at the bottom of the screen. Use for booking confirmations, errors, session warnings.',
      },
    },
  },
};

export const AllTypes = {
  name: 'All Types',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-col">
      <Snackbar type="default" message="Searching available buses..." visible />
      <Snackbar type="success" message="Seat 14 selected. Proceed to passenger details." visible />
      <Snackbar type="error"   message="Session expired. Please search again." actionLabel="Retry" visible />
      <Snackbar type="warning" message="Only 2 seats left on this service." visible />
    </div>
  ),
};

export const WithAction = {
  name: 'With Action',
  parameters: { controls: { disable: true } },
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div className="story-col">
        <Snackbar
          type="default"
          message="Seat selection cleared."
          actionLabel="Undo"
          onAction={() => alert('Undo clicked')}
          onDismiss={() => setVisible(false)}
          visible={visible}
          duration={0}
        />
        {!visible && (
          <Button variant="outlined" size="sm" onClick={() => setVisible(true)}>
            Show again
          </Button>
        )}
      </div>
    );
  },
};
