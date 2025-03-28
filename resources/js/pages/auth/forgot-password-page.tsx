import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '@/components/forms/auth/forgot-password-form';
import AppLogo from '@/components/app-logo';
import Button from '@/components/ui/button';
import { Icons } from '@/components/icons';

function ForgotPasswordPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-illustrations bg-white bg-bottom bg-contain bg-no-repeat md:bg-transparent">
      <AppLogo className="mt-8 mb-4 md:mt-12 md:mb-6 xl:mt-0" />

      <div className="w-[90vw] max-w-96 mx-auto mb-16 md:bg-white md:shadow-md sm:rounded-lg md:p-10 md:mb-20 xl:mb-28">
        <h1 className="title mb-2">Сброс пароля</h1>

        <p className="text-gray-600 mb-6">
          Забыли пароль? Нет проблем. Просто сообщите нам свой адрес электронной почты, и мы вышлем вам ссылку, которая позволит вам выбрать новый.
        </p>

        <ForgotPasswordForm />

        <Button
          className="text-sm mt-2 text-blue-600 hover:text-blue-400"
          variant="text"
          type="button"
          onClick={() => navigate(-1)}
        >
          <Icons.west height={8} /> Назад
        </Button>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
