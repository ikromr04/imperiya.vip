import React from 'react';
import MainLogo from '../../layouts/main-logo';
import { Icons } from '../../icons';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import ResetPasswordForm from '../../forms/reset-password-form/reset-password-form';

export default function ResetPasswordPage(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-illustrations bg-white bg-bottom bg-contain bg-no-repeat md:bg-transparent">
      <MainLogo className="mt-8 mb-4 md:mt-12 md:mb-6 xl:mt-0" />

      <div className="w-[90vw] max-w-96 mx-auto mb-16 md:bg-white md:shadow-md sm:rounded-lg md:p-10 md:mb-20 xl:mb-28">
        <h1 className="title mb-6">Сброс пароля</h1>

        <ResetPasswordForm />

        <Link className="flex items-center gap-x-1 text-blue-600 transition-all duration-300 hover:text-blue-400 text-sm py-1 px-2 mt-2" to={AppRoute.Auth.Login}>
          <Icons.arrowLeft width={14} height={14} /> Вход в онлайн-дневник
        </Link>
      </div>
    </main>
  );
}
