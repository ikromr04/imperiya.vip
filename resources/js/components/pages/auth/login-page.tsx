import React from 'react';
import LoginForm from '../../forms/login-form';

export default function LoginPage(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <LoginForm className="container" />
    </main>
  );
}
