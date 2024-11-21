import React from 'react';
import LoginForm from '../../forms/login-form';
import MainLogo from '../../layouts/main-logo';
import { Link } from 'react-router-dom';

export default function LoginPage(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-illustrations bg-bottom bg-contain bg-no-repeat py-8 md:py-12 lg:py-16">
      <MainLogo className="mb-4 sm:mb-6 lg:mb-8" />

      <div className="container px-4 sm:bg-white sm:shadow-lg sm:border sm:max-w-max sm:p-10 sm:rounded-xl">
        <h1 className="title text-center mb-1">Вход в онлайн-дневник</h1>

        <p className="text-gray-600 text-center mb-8">
          Нет аккаунта? <Link className="text-blue-600 transition-all duration-300 hover:text-blue-400" to="mailto:info@imperiya.vip">Отправьте запрос</Link>
        </p>

        <LoginForm className="mx-auto" />
      </div>
    </main>
  );
}
