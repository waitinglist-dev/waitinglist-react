import React from 'react';
import { WaitinglistForm } from '@waitinglist/react';

// Basic usage - minimal setup
function BasicWaitinglistExample() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
      fields={['email', 'name']}
      onSuccess={(data) => {
        console.log(`User added! Position: #${data.position}`);
      }}
    />
  );
}

// With phone number
function WithPhoneExample() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
      fields={['email', 'name', 'phone']}
      onSuccess={(data) => {
        // Track conversion in your analytics
        gtag('event', 'waitlist_signup', {
          position: data.position,
          email: data.email,
        });
      }}
      onError={(error) => {
        // Handle errors gracefully
        console.error('Signup failed:', error);
      }}
    />
  );
}

// Simple array configuration
function SimpleArrayConfig() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
      fields={['email', 'name', 'phone']}
      submitButtonText="Join Beta"
      successMessage="Thanks for joining our beta!"
      tags={['beta-users']}
    />
  );
}

export { BasicWaitinglistExample, WithPhoneExample, SimpleArrayConfig };
