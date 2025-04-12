import React from 'react';
import Button from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center my-8">
        <img
          className="flex max-w-[400px] aspect-[600/400] mb-6"
          src="/images/404.svg"
          width={600}
          height={400}
          alt="Not found status code"
        />

        <h1 className="title mb-4">Упс! Страница не найдена :(</h1>

        <p className="max-w-[580px] text-center mb-8">
          К сожалению, страница, которую вы ищете, не существует. Если вы уверены, что произошла ошибка, то сообщите своему <a className="text-blue-600 underline underline-offset-2" href="https://wa.me/+992918339939" target="_blank">администратору</a> или дайте нам знать.
        </p>

        <Button onClick={() => navigate(-1)}>
          Вернуться назад
        </Button>
      </div>
    </main>
  );
}

export default NotFoundPage;
