import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import CopyButton from '@/components/ui/copy-button';
import DescriptionList from '@/components/ui/description-list';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import Tooltip from '@/components/ui/tooltip';
import { RoleName, SexName } from '@/const/users';
import { User } from '@/types/users';
import dayjs from 'dayjs';
import React, { lazy, memo, Suspense, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Nationality from './nationality';

const UsersEditForm = lazy(() => import('@/components/forms/users/users-edit-form'));

type BaseInfoProps = {
  user: User;
};

function BaseInfo({
  user,
}: BaseInfoProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const listData = useMemo(() => {
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
      'Национальность': <Nationality user={user} />,
      'WhatsApp': user.whatsapp ? (
        <a className="text-blue-600" href={`https://wa.me/+${user.whatsapp.code}${user.whatsapp.numbers}`} target="_blank" rel="noopener noreferrer">
          +{user.whatsapp.code} {user.whatsapp.numbers}
        </a>
      ) : '-',
    };
  }, [user]);

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="title md:!text-lg">Базовая информация</h2>

          <Button variant="light" onClick={() => setIsOpen(true)}>
            <Icons.edit width={14} height={14} />
            <Tooltip label="Редактировать" position="left" />
          </Button>
        </header>

        <div className="relative">
          <DescriptionList className="box__body" list={listData} />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <Suspense fallback={<Spinner className="w-10 h-10" />}>
            <UsersEditForm
              user={user}
              setIsOpen={setIsOpen}
            />
          </Suspense>
        </Modal>
      )}
    </>
  );
}

export default memo(BaseInfo);
