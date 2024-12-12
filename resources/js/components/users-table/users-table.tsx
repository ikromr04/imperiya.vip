import React from 'react';
import { PropsWithClassname } from '../../types';
import { User, Users } from '../../types/users';
import DataTable, { DataTableColumns } from '../data-table';
import NameAccessor from './anccessors/name-accessor';
import dayjs from 'dayjs';
import SocialsAccessor from './anccessors/socials-accessor';
import GenderAccessor from './anccessors/gender-accessor';

export type AccessorProps = {
  user: User;
};

type UsersTableProps = PropsWithClassname<{
  users: Users;
}>;

export default function UsersTable({
  className,
  users,
}: UsersTableProps): JSX.Element {
  const columns: DataTableColumns = [
    {
      accessor: 'name',
      header: 'ФИО',
      width: 240,
    },
    {
      accessor: 'gender',
      header: <span className="flex w-full justify-center">Пол</span>,
      width: 60,
    },
    {
      accessor: 'grade',
      header: <span className="flex w-full justify-center">Класс</span>,
      width: 60,
    },
    {
      accessor: 'role',
      header: 'Позиция',
      width: 140,
    },
    {
      accessor: 'login',
      header: 'Логин',
    },
    {
      accessor: 'email',
      header: 'Электронная почта',
    },
    {
      accessor: 'birthDate',
      header: 'Дата рождения',
    },
    {
      accessor: 'address',
      header: 'Адрес',
    },
    {
      accessor: 'nationality',
      header: 'Национальность',
    },
    {
      accessor: 'socials',
      header: 'Социальные сети',
    },
  ];

  const records = users.map((user) => ({
    name: <NameAccessor user={user} />,
    login: user.login,
    role: <span className="accent">{user.role.name}</span>,
    email: user.email,
    birthDate: dayjs(user.birthDate).format('DD MMMM YYYY'),
    address: user.address,
    socials: <SocialsAccessor user={user} />,
    gender: <GenderAccessor user={user} />,
    grade: user.grade && <b className="flex w-full justify-center text-lg">{user.grade?.level} {user.grade?.group}</b>,
    nationality: user.nationality?.name,
  }));

  return (
    <DataTable
      className={className}
      records={records}
      columns={columns}
    />
  );
}
