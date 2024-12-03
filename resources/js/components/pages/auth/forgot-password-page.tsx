import React from 'react';
import MainLogo from '../../layouts/main-logo';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../icons';
import ForgotPasswordForm from '../../forms/forgot-password-form';
import Button from '../../ui/button';

export default function ForgotPasswordPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-illustrations bg-white bg-bottom bg-contain bg-no-repeat md:bg-transparent">
      <MainLogo className="mt-8 mb-4 md:mt-12 md:mb-6 xl:mt-0" />

      <div className="w-[90vw] max-w-96 mx-auto mb-16 md:bg-white md:shadow-md sm:rounded-lg md:p-10 md:mb-20 xl:mb-28">
        <h1 className="title mb-2">Сброс пароля</h1>

        <p className="text-gray-600 mb-6">
          Забыли пароль? Нет проблем. Просто сообщите нам свой адрес электронной почты, и мы вышлем вам ссылку, которая позволит вам выбрать новый.
        </p>

        <ForgotPasswordForm />

        <Button
          className="text-sm mt-2"
          variant="text"
          type="button"
          onClick={() => navigate(-1)}
        >
          <Icons.arrowLeftLong width={12} /> Назад
        </Button>
      </div>
    </main>
  );
}
