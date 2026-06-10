import React from 'react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export const NoBuses = {
  name: 'No Buses Found',
  render: () => (
    <EmptyState
      icon="directions_bus"
      title="No Buses Available"
      description="There are no buses running on this route for the selected date. Try a different date or nearby routes."
      action={<Button variant="filled">Change Date</Button>}
    />
  ),
};

export const NoResults = {
  name: 'No Filter Results',
  render: () => (
    <EmptyState
      icon="filter_alt_off"
      title="No Matching Buses"
      description="No buses match your current filters. Clear filters to see all available services."
      action={<Button variant="outlined">Clear Filters</Button>}
    />
  ),
};

export const NoHistory = {
  name: 'No Booking History',
  render: () => (
    <EmptyState
      icon="receipt_long"
      title="No Bookings Yet"
      description="Your booking history will appear here once you've made your first reservation."
      action={<Button variant="filled" icon="search">Search Buses</Button>}
    />
  ),
};

export const SearchFirst = {
  name: 'Search Prompt (Initial State)',
  render: () => (
    <EmptyState
      icon="travel_explore"
      title="Start Your Journey"
      description="Enter your source, destination, and travel date to find available OPRS buses."
    />
  ),
};
