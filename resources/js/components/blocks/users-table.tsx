import React from 'react';
import dayjs from 'dayjs';
import { generatePath, Link } from 'react-router-dom';
import { Users } from '@/types/users';
import { useAppSelector } from '@/hooks';
import { getUsersFilter } from '@/store/app-slice/app-selector';
import DataTable, { DataTableColumns } from '../ui/data-table';
import Button from '../ui/button';
import { Icons } from '../icons';
import { AppRoute } from '@/const/routes';
import { RoleName } from '@/const/users';

type UsersTableProps = {
  className?: string;
  users: Users;
};

function UsersTable({
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
      accessor: 'sex',
      header: <span className="flex w-full justify-center">Пол</span>,
      width: 56,
      hidden: !filter.sex.visibility,
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
      accessor: 'phoneNumbers',
      header: 'Телефоны',
      width: 120,
      hidden: !filter.phoneNumber.visibility,
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
      hidden: !filter.birthDate.visibility,
    },
    {
      accessor: 'address',
      header: 'Адрес',
      hidden: !filter.address.visibility,
    },
    {
      accessor: 'nationality',
      header: <span className="flex w-full justify-center">Национальность</span>,
      width: 136,
      hidden: !filter.nationalities.visibility,
    },
    {
      accessor: 'socialLinks',
      header: 'Социальные сети',
      width: 128,
      hidden: !filter.socialLink.visibility,
    },
  ];

  const records = users.map((user) => ({
    id: user.id,
    name:
      <Button className="min-h-max !px-0 leading-[1.2]" href={generatePath(AppRoute.Users.Show, { userId: user.id })} variant="text">
        <span className="relative z-0 flex min-w-12 min-h-12 rounded-full bg-gray-100 overflow-hidden">
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
    sex: user.sex === 'male' ? <Icons.male className="flex mx-auto text-blue-600" width={20} height={20} />
      : (user.sex === 'female' ? <Icons.female className="flex mx-auto text-pink-600" width={20} height={20} /> : ''),
    role:
      <span className="flex max-w-max text-center bg-blue-200 text-primary rounded-full text-sm py-1 px-2 leading-none">
        {RoleName[user.role]}
      </span>,
    grade: user.student?.grade && <b className="flex w-full justify-center text-lg">{user.student.grade.level} {user.student.grade.group}</b>,
    phoneNumbers:
      <div className="flex flex-col gap-1">
        {user.phoneNumbers?.map((phone) => (
          <Link key={phone.numbers} className="font-medium" to={`tel:+${phone.code}${phone.numbers}`}>
            +{`${phone.code} ${phone.numbers}`}
          </Link>
        ))}
      </div>,
    email:
      <Link className="text-blue-500 font-normal" to={`mailto:${user.email}`}>
        {user.email}
      </Link>,
    login: user.login,
    birthDate: user.birthDate ? dayjs(user.birthDate).format('DD MMMM YYYY') : '',
    address: user.address,
    nationality: <span className="flex mx-auto">{user.nationality?.name}</span>,
    socialLinks:
      <div className="flex flex-wrap gap-2">
        {user.socialLink?.facebook &&
          <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.socialLink.facebook} target="_blank">
            <Icons.facebook width={24} height={24} />
          </Link>}
        {user.socialLink?.instagram &&
          <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.socialLink?.instagram} target="_blank">
            <Icons.instagram width={24} height={24} />
          </Link>}
        {user.socialLink?.telegram &&
          <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.socialLink?.telegram} target="_blank">
            <Icons.telegram width={24} height={24} />
          </Link>}
        {user.socialLink?.odnoklassniki &&
          <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.socialLink?.odnoklassniki} target="_blank">
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

export default UsersTable;
