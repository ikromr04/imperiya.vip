import CopyButton from '@/components/ui/copy-button';
import DescriptionList from '@/components/ui/description-list';
import { RoleName, SexName } from '@/const/users';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import dayjs from 'dayjs';
import React, { memo, ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Nationality from './nationality';

function BaseInfo(): ReactNode {
  const user = useAppSelector(getAuthUser);

  const listData = useMemo(() => {
    if (!user) return {};

    return {
      'Фамилия': user.surname,
      'Имя': user.name,
      'Отчество': user.patronymic ?? '-',
      'Логин': user.login,
      'Пароль': user.password ? (
        <CopyButton className="items-baseline font-normal text-[16px] h-auto !p-0 shadow-none" string={user.password}>
          Скопировать
        </CopyButton>
      ) : '-',
      'Позиция': RoleName[user.role],
      'Пол': SexName[user.sex],
      'Электронная почта': user.email ? (
        <Link className="text-blue-600" to={`mailto:${user.email}`}>
          {user.email}
        </Link>
      ) : '-',
      'Дата рождения': user.birthDate ? dayjs(user.birthDate).format('DD MMMM YYYY') : '-',
      'Адрес': user.address
        ? `${user.address.region !== 'За пределами города' ? 'район ' : ''}${user.address.region}, ${user.address.physicalAddress}`
        : '-',
      'Национальность': <Nationality />,
      'WhatsApp': user.whatsapp ? (
        <a className="text-blue-600" href={`https://wa.me/+${user.whatsapp.code}${user.whatsapp.numbers}`} target="_blank" rel="noopener noreferrer">
          +{user.whatsapp.code} {user.whatsapp.numbers}
        </a>
      ) : '-',
    };
  }, [user]);

  if (!user) return;

  return (
    <section className="box">
      <header className="box__header">
        <h2 className="title md:!text-lg">Базовая информация</h2>
      </header>

      <div className="relative">
        <DescriptionList className="box__body" list={listData} />
        <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}

export default memo(BaseInfo);
