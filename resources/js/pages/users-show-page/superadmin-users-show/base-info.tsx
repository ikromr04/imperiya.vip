import UsersEditForm from '@/components/forms/users/users-edit-form';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import CopyButton from '@/components/ui/copy-button';
import DescriptionList from '@/components/ui/description-list';
import Modal from '@/components/ui/modal';
import Tooltip from '@/components/ui/tooltip';
import { RoleName, SexName } from '@/const/users';
import { Nationalities } from '@/types/nationalities';
import { User } from '@/types/users';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type BaseInfoProps = {
  user: User;
  nationalities: Nationalities;
};

function BaseInfo({
  user,
  nationalities,
}: BaseInfoProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="title !text-lg">Базовая информация</h2>

          <Button variant="light" onClick={() => setIsOpen(true)}>
            <Icons.edit width={14} height={14} />
            <Tooltip label="Редактировать" position="left" />
          </Button>
        </header>

        <div className="relative">
          <DescriptionList
            className="box__body"
            list={{
              'Фамилия': user.surname,
              'Имя': user.name,
              'Отчество': user.patronymic ?? '-',
              'Логин': user.login,
              'Пароль': user.password ? (
                <CopyButton className="items-baseline font-normal text-[16px] h-auto !p-0 shadow-none" string={user.password} >
                  Скопировать
                </CopyButton>
              ) : '',
              'Позиция': RoleName[user.role],
              'Пол': SexName[user.sex],
              'Электронная почта':
                user.email ? (
                  <Link className="text-blue-600" to={`mailto:${user.email}`}>
                    {user.email}
                  </Link>
                ) : '-',
              'Дата рождения': user.birthDate ? dayjs(user.birthDate).format('DD MMMM YYYY') : '-',
              'Адрес': user.address ?
                `${(user.address.region !== 'За пределами города') ? 'район ' : ''}${user.address.region}, ${user.address.physicalAddress}`
                : '-',
              'Национальность': nationalities.find(({ id }) => id === user.nationalityId)?.name || '-',
              'WhatsApp': (user.whatsapp?.code && user.whatsapp?.numbers) ? (
                <a
                  className="text-blue-600"
                  href={`https://wa.me/+${user.whatsapp.code}${user.whatsapp.numbers}`}
                  target="_blank"
                >
                  +{user.whatsapp.code} {user.whatsapp.numbers}
                </a>
              ) : '-',
            }}
          />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>

      <Modal isOpen={isOpen}>
        <UsersEditForm user={user} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}

export default BaseInfo;
