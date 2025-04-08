import React, { Suspense } from 'react';
import LoginClient from './client';

export const metadata = {
  title: 'Login | Impacto',
  description: 'Log in to your Impacto account',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
} 