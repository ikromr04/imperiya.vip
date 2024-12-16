import React from 'react';
import { PropsWithClassname } from '../types';
import { User, Users } from '../types/users';
import DataTable, { DataTableColumns } from './data-table';
import dayjs from 'dayjs';
import Button from './ui/button';
import { AppRoute } from '../const';
import { Icons } from './icons';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { getUsersFilter } from '../store/app-slice/app-selector';

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
  const filter = useAppSelector(getUsersFilter);
  const columns: DataTableColumns = [
    {
      accessor: 'name',
      header: 'ФИО',
      width: filter.name.visibility ? 240 : 48,
    },
    {
      accessor: 'gender',
      header: <span className="flex w-full justify-center">Пол</span>,
      width: 56,
      hidden: !filter.gender.visibility,
    },
    {
      accessor: 'role',
      header: 'Позиция',
      width: 120,
      hidden: !filter.roles.visibility,
    },
    {
      accessor: 'grade',
      header: <span className="flex w-full justify-center">Класс</span>,
      width: 64,
      hidden: !filter.grades.visibility,
    },
    {
      accessor: 'phones',
      header: 'Телефоны',
      width: 120,
      hidden: !filter.phone.visibility,
    },
    {
      accessor: 'email',
      header: 'Электронная почта',
      hidden: !filter.email.visibility,
    },
    {
      accessor: 'login',
      header: 'Логин',
      width: 160,
      hidden: !filter.login.visibility,
    },
    {
      accessor: 'birthDate',
      header: 'Дата рождения',
      width: 140,
    },
    {
      accessor: 'address',
      header: 'Адрес',
    },
    {
      accessor: 'nationality',
      header: <span className="flex w-full justify-center">Национальность</span>,
      width: 136,
    },
    {
      accessor: 'socials',
      header: 'Социальные сети',
      width: 128,
    },
  ];

  const records = users.map((user) => ({
    name:
      <Button className="min-h-max !px-0 leading-[1.2]" href={AppRoute.Users.Index} variant="text">
        <span className="relative z-0 flex min-w-12 min-h-12 rounded-full bg-gray-100">
          {user.avatarThumb &&
            <img
              className="absolute z-10 top-0 left-0 w-full h-full object-cover"
              src={user.avatarThumb}
              width={200}
              height={200}
              alt={user.name}
            />}
          <Icons.user className="text-gray-300" width={48} height={48} />
        </span>
        {filter.name.visibility && user.name}
      </Button>,
    gender: user.gender?.id === 1 ? <Icons.male className="flex mx-auto text-blue-600" width={16} height={16} />
      : (user.gender?.id === 2 ? <Icons.female className="flex mx-auto text-pink-600" width={16} height={16} /> : ''),
    role:
      <span className="flex max-w-max text-center bg-blue-200 text-primary rounded-full text-sm py-1 px-2 leading-none">
        {user.role.name}
      </span>,
    grade: user.grade && <b className="flex w-full justify-center text-lg">{user.grade?.level} {user.grade?.group}</b>,
    phones:
      <div className="flex flex-col gap-1">
        {user.phones?.map((phone) => (
          <Link key={user.id} className="font-medium" to={`tel:+${phone.dialCode}${phone.numbers}`}>
            +{`${phone.dialCode} ${phone.numbers}`}
          </Link>
        ))}
      </div>,
    email:
      <Button className="text-blue-500 font-normal" href={`mailto:${user.email}`} variant="text">
        {user.email}
      </Button>,
    login: user.login,
    birthDate: dayjs(user.birthDate).format('DD MMMM YYYY'),
    nationality: <span className="flex mx-auto">{user.nationality?.name}</span>,
    address: user.address,
    socials:
      <div className="flex flex-wrap gap-2">
        {user.facebook &&
          <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.facebook} target="_blank">
            <Icons.facebook width={24} height={24} />
          </Link>}
        {user.instagram &&
          <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.instagram} target="_blank">
            <Icons.instagram width={24} height={24} />
          </Link>}
        {user.telegram &&
          <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.telegram} target="_blank">
            <Icons.telegram width={24} height={24} />
          </Link>}
        {user.odnoklassniki &&
          <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.odnoklassniki} target="_blank">
            <Icons.odnoklassniki width={24} height={24} />
          </Link>}
      </div>,
  }));

  return (
    <DataTable
      className={className}
      records={records}
      columns={columns}
    />
  );
}
