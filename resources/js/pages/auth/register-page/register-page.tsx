import Spinner from '@/components/ui/spinner';
import { useAppDispatch } from '@/hooks';
import { checkRegisterLinkAction } from '@/store/auth-slice/auth-api-actions';
import { RegisterLink } from '@/types/auth';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Timer from './timer';
import AppLogo from '@/components/app-logo';
import RegisterForm from '@/components/forms/auth/register-form';

function RegisterPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [link, setLink] = useState<RegisterLink | null>(null);

  useEffect(() => {
    if (token && !link) dispatch(checkRegisterLinkAction({
      token,
      onSuccess: (registerLink) => setLink(registerLink),
      onFail: () => setLink({ expiresAt: dayjs().format('YYYY-MM-DD'), token, id: 0 }),
    }));
  }, [dispatch, link, token]);

  if (!link) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const secondsLeft = dayjs(link.expiresAt).diff(dayjs(), 'second');

  if (secondsLeft <= 0) {
    return (
      <div className="flex">
        Invalid token
        <Timer secondsLeft={secondsLeft} />
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen p-4 md:px-6 lg:px-8">
      <Timer secondsLeft={secondsLeft} />
      <AppLogo className="mx-auto mb-4" />

      <section className="leading-[1.2] border border-dashed rounded-md border-orange-300 max-w-[610px] mx-auto px-8 py-4 mb-6">
        <h2 className="uppercase text-danger inline">Внимание! </h2>
        <p className="inline">Вся информация, внесенная в данную форму, редактированию не подлежит. В случае необходимости внесения изменений или дополнений обратитесь к <a className="text-blue-600 underline underline-offset-2" href="https://wa.me/+992918339939" target="_blank">администратору</a>.</p>
      </section>

      <RegisterForm token={token} />
    </main>
  );
}

export default RegisterPage;
