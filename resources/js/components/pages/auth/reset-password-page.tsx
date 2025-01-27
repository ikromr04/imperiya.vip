import React from 'react';
import MainLogo from '../../layouts/main-logo';
import { Icons } from '../../icons';
import { AppRoute } from '../../../const';
import ResetPasswordForm from '../../forms/reset-password-form';
import Button from '../../ui/button';

function ResetPasswordPage(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-illustrations bg-white bg-bottom bg-contain bg-no-repeat md:bg-transparent">
      <MainLogo className="mt-8 mb-4 md:mt-12 md:mb-6 xl:mt-0" />

      <div className="w-[90vw] max-w-96 mx-auto mb-16 md:bg-white md:shadow-md sm:rounded-lg md:p-10 md:mb-20 xl:mb-28">
        <h1 className="title mb-6">Сброс пароля</h1>

        <ResetPasswordForm />

        <Button
          className="text-sm mt-2 text-blue-600 hover:text-blue-400"
          variant="text"
          href={AppRoute.Auth.Login}
        >
          <Icons.west height={8} /> Вход в онлайн-дневник
        </Button>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
