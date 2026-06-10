import React, { useState } from 'react';
import { RadioButton, RadioGroup } from './RadioButton';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Mutually exclusive selection within a group. Use for passenger count, seat type preference, or payment method selection.',
      },
    },
  },
};

export const AllStates = {
  name: 'All States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="story-row">
      <div><div className="story-label">Unchecked</div><RadioButton label="Adult" name="demo" value="adult" /></div>
      <div><div className="story-label">Checked</div><RadioButton label="Adult" name="demo2" value="adult" checked onChange={() => {}} /></div>
      <div><div className="story-label">Disabled</div><RadioButton label="Concession" name="demo3" value="c" disabled /></div>
    </div>
  ),
};

export const PassengerType = {
  name: 'Passenger Type (RadioGroup)',
  render: () => {
    const [type, setType] = useState('adult');
    return (
      <RadioGroup
        name="pax-type"
        value={type}
        onChange={setType}
        options={[
          { value: 'adult',     label: 'Adult',     helperText: 'Full fare' },
          { value: 'child',     label: 'Child',     helperText: '50% of adult fare (5–12 yrs)' },
          { value: 'senior',    label: 'Senior Citizen', helperText: '30% concession' },
          { value: 'student',   label: 'Student',   helperText: 'Valid ID required', disabled: true },
        ]}
      />
    );
  },
};

export const PaymentMethod = {
  name: 'Payment Method',
  render: () => {
    const [method, setMethod] = useState('upi');
    return (
      <RadioGroup
        name="payment"
        value={method}
        onChange={setMethod}
        direction="horizontal"
        options={[
          { value: 'upi',   label: 'UPI' },
          { value: 'card',  label: 'Card' },
          { value: 'netbanking', label: 'Net Banking' },
        ]}
      />
    );
  },
};
