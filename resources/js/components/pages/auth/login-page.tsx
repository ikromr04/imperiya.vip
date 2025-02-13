import LoginForm from '@/components/forms/login-form';
import MainLogo from '@/components/layouts/main-logo';
import { AppRoute } from '@/const/routes';
import { AuthorizationStatus } from '@/const/store';
import { useAppSelector } from '@/hooks';
import { getAuthStatus } from '@/store/auth-slice/auth-selector';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Journal} />;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white bg-illustrations bg-bottom bg-contain bg-no-repeat md:bg-transparent">
      <MainLogo className="mt-8 mb-4 md:mt-12 md:mb-6 xl:mt-0" />

      <div className="w-[90vw] max-w-96 mx-auto mb-16 md:bg-white md:shadow-md sm:rounded-lg md:p-10 md:mb-20 xl:mb-28">
        <h1 className="title">Вход в онлайн-дневник</h1>

        <p className="text-gray-600 mb-6">
          Нет аккаунта? <Link className="text-blue-600 transition-all duration-300 hover:text-blue-400" to="mailto:info@imperiya.vip">Отправьте запрос</Link>
        </p>

        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;
