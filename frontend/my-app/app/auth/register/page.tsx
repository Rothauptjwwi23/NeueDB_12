'use client';

import React from 'react';
import { RegisterForm } from '../../components/auth';

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Registrieren</h1>
      <RegisterForm />
    </div>
  );
}