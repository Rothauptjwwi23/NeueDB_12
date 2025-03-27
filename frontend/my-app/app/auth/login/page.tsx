'use client';

import React from 'react';
import { LoginForm } from '../../components/auth';

export default function LoginPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Login</h1>
      <LoginForm />
    </div>
  );
}