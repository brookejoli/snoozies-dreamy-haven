// src/pages/Subscribe.tsx
import React from 'react';
import { EmailSignup } from '../components/EmailSignup';

export default function Subscribe() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <EmailSignup />
      </div>
    </div>
  );
}
