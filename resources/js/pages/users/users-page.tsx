import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUsers } from '@/store/users-slice/users-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import { User, UsersFilter } from '@/types/users';
import DataTable from '@/components/ui/data-table/data-table';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Icons } from '@/components/icons';
import { RoleName, ROLES, SexName } from '@/const/users';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import dayjs from 'dayjs';
import TextField from '@/components/ui/form-controls/text-field';
import { filterUsers } from '@/utils/users';
import SelectField from '@/components/ui/form-controls/select-field';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import UsersCreateForm from '@/components/forms/users/users-create-form/users-create-form';
import AppLayout from '@/components/layouts/app-layout';
import { getNationalities } from '@/store/nationalities-slice/nationalities-selector';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';

function UsersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const nationalities = useAppSelector(getNationalities);
  const grades = useAppSelector(getGrades);
  const [filter, setFilter] = useState<UsersFilter>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!nationalities.data && !nationalities.isFetching) dispatch(fetchNationalitiesAction());
  }, [dispatch, grades.data, grades.isFetching, nationalities.data, nationalities.isFetching, users.data, users.isFetching]);

  const columns: ColumnDef<User>[] = [
    {
      id: 'avatarThumb',
      accessorKey: 'avatarThumb',
      header: 'Фото',
      size: 64,
      cell: ({ row }) => (
        <span className="relative z-0 flex min-w-12 max-w-12 min-h-12 max-h-12 rounded-full bg-gray-100 overflow-hidden">
          {row.original.avatarThumb &&
            <img
              className="absolute z-10 top-0 left-0 w-full h-full object-cover"
              src={row.original.avatarThumb}
              width={200}
              height={200}
              alt={row.original.name}
            />}
          <Icons.user className="text-gray-300" width={48} height={48} />
        </span>
      ),
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'ФИО',
      size: 240,
      cell: ({ row }) => (
        <Link to={generatePath(AppRoute.Users.Show, { id: row.original.id })}>
          {row.original.name} {row.original.surname}
        </Link>
      ),
      enableColumnFilter: filter.name ? true : false,
      meta: {
        renderFilter: () => (
          <TextField
            placeholder="Искать..."
            value={filter.name || ''}
            onChange={(value) => setFilter((prev) => ({ ...prev, name: value as string }))}
            onInput={(evt: BaseSyntheticEvent) => setFilter((prev) => ({ ...prev, name: evt.target.value }))}
          />
        ),
      }
    },
    {
      id: 'sex',
      accessorKey: 'sex',
      header: 'Пол',
      size: 64,
      cell: ({ row }) => (
        row.original.sex === 'male' ? (
          <Icons.male className="flex text-blue-600" width={20} height={20} />
        ) : (
          <Icons.female className="flex text-pink-600" width={20} height={20} />
        )
      ),
      enableColumnFilter: filter.sex ? true : false,
      meta: {
        renderFilter: () => (
          <SelectField
            placeholder="--Выбрать--"
            options={[
              { value: 'male', label: SexName['male'] },
              { value: 'female', label: SexName['female'] },
            ]}
            value={filter.sex || ''}
            onChange={(value) => setFilter((prev) => ({ ...prev, sex: value }))}
          />
        ),
      }
    },
    {
      id: 'grade',
      accessorKey: 'grade',
      header: 'Класс',
      size: 80,
      cell: ({ row }) => {
        const grade = grades.data?.find(({ id }) => id === row.original.student?.gradeId);
        if (grade) {
          return (
            <Link
              className="flex w-max text-lg font-semibold"
              to={generatePath(AppRoute.Classes.Show, { id: grade.id })}
            >
              {grade.level} {grade.group}
            </Link>
          );
        }
      },
      sortingFn: (rowA, rowB) => {
        const gradeA = grades.data?.find(({ id }) => id === rowA.original.student?.gradeId)?.level.toString() || '';
        const gradeB = grades.data?.find(({ id }) => id === rowB.original.student?.gradeId)?.level.toString() || '';

        return gradeA.localeCompare(gradeB);
      },
      enableColumnFilter: filter.grade ? true : false,
      meta: {
        renderFilter: () => (
          <SelectField
            placeholder="--Выбрать--"
            options={(grades.data || []).map((grade) => ({ value: grade.id.toString(), label: `${grade.level} ${grade.group}` }))}
            value={filter.grade || ''}
            onChange={(value) => setFilter((prev) => ({ ...prev, grade: value }))}
          />
        ),
      }
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Позиция',
      size: 130,
      cell: ({ row }) => (
        <span className="flex max-w-max text-center bg-blue-200 text-primary rounded-full text-sm py-1 px-2 leading-none">
          {RoleName[row.original.role]}
        </span>
      ),
      enableColumnFilter: filter.role ? true : false,
      meta: {
        renderFilter: () => (
          <SelectField
            placeholder="--Выбрать--"
            options={ROLES.map((role) => ({ value: role, label: RoleName[role as keyof typeof RoleName] }))}
            value={filter.role || ''}
            onChange={(value) => setFilter((prev) => ({ ...prev, role: value }))}
          />
        ),
      }
    },
    {
      id: 'phoneNumbers',
      accessorKey: 'phoneNumbers',
      header: 'Телефоны',
      size: 140,
      cell: ({ row }) => row.original.phoneNumbers && (
        <div className="flex flex-col">
          {row.original.phoneNumbers?.map((phone) => (
            <a
              key={phone.numbers}
              className="font-medium min-w-max"
              href={`tel:+${phone.code}${phone.numbers}`}
            >
              +{`${phone.code} ${phone.numbers}`}
            </a>
          ))}
        </div>
      ),
      enableColumnFilter: filter.phone ? true : false,
      meta: {
        renderFilter: () => (
          <TextField
            placeholder="Искать..."
            value={filter.phone || ''}
            onInput={(evt: BaseSyntheticEvent) => setFilter((prev) => ({ ...prev, phone: evt.target.value }))}
            onChange={(value) => setFilter((prev) => ({ ...prev, phone: value as string }))}
          />
        ),
      }
    },
    {
      id: 'whatsapp',
      accessorKey: 'whatsapp',
      header: 'WhatsApp',
      size: 140,
      cell: ({ row }) => row.original.whatsapp && (
        <div className="flex flex-col">
          <a
            key={row.original.whatsapp.numbers}
            className="font-medium min-w-max"
            href={`https://wa.me/+${row.original.whatsapp.code}${row.original.whatsapp.numbers}`}
            target="_blank"
          >
            +{`${row.original.whatsapp.code} ${row.original.whatsapp.numbers}`}
          </a>
        </div>
      ),
      enableColumnFilter: filter.whatsapp ? true : false,
      meta: {
        renderFilter: () => (
          <TextField
            placeholder="Искать..."
            value={filter.whatsapp || ''}
            onInput={(evt: BaseSyntheticEvent) => setFilter((prev) => ({ ...prev, whatsapp: evt.target.value }))}
            onChange={(value) => setFilter((prev) => ({ ...prev, whatsapp: value as string }))}
          />
        ),
      }
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Электронная почта',
      size: 180,
      cell: ({ row }) => row.original.email && (
        <a
          className="text-blue-500 font-normal"
          href={`mailto:${row.original.email}`}
        >
          {row.original.email}
        </a>
      ),
      enableColumnFilter: filter.email ? true : false,
      meta: {
        renderFilter: () => (
          <TextField
            placeholder="Искать..."
            value={filter.email || ''}
            onInput={(evt: BaseSyntheticEvent) => setFilter((prev) => ({ ...prev, email: evt.target.value }))}
            onChange={(value) => setFilter((prev) => ({ ...prev, email: value as string }))}
          />
        ),
      }
    },
    {
      id: 'login',
      accessorKey: 'login',
      header: 'Логин',
      size: 220,
      enableColumnFilter: filter.login ? true : false,
      meta: {
        renderFilter: () => (
          <TextField
            placeholder="Искать..."
            value={filter.login || ''}
            onInput={(evt: BaseSyntheticEvent) => setFilter((prev) => ({ ...prev, login: evt.target.value }))}
            onChange={(value) => setFilter((prev) => ({ ...prev, login: value as string }))}
          />
        ),
      }
    },
    {
      id: 'birthDate',
      accessorKey: 'birthDate',
      header: 'Дата рождения',
      size: 140,
      cell: ({ row }) => row.original.birthDate && (
        dayjs(row.original.birthDate).format('DD MMM YYYY')
      ),
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: 'Адрес',
      size: 280,
      enableColumnFilter: filter.address ? true : false,
      cell: ({ row }) => row.original.address && (
        <>
          {(row.original.address.region !== 'За пределами города') && 'район '}
          {row.original.address.region}, {row.original.address.physicalAddress}
        </>
      ),
      sortingFn: (rowA, rowB) => {
        const addressA = rowA.original.address ? `${rowA.original.address.region}, ${rowA.original.address.physicalAddress}` : '';
        const addressB = rowB.original.address ? `${rowB.original.address.region}, ${rowB.original.address.physicalAddress}` : '';

        return addressA.localeCompare(addressB);
      },
      meta: {
        renderFilter: () => (
          <TextField
            placeholder="Искать..."
            value={filter.address || ''}
            onInput={(evt: BaseSyntheticEvent) => setFilter((prev) => ({ ...prev, address: evt.target.value }))}
            onChange={(value) => setFilter((prev) => ({ ...prev, address: value as string }))}
          />
        ),
      }
    },
    {
      id: 'nationality',
      accessorKey: 'nationality',
      header: 'Национальность',
      size: 160,
      enableColumnFilter: filter.nationality ? true : false,
      cell: ({ row }) => nationalities.data?.find((nationality) => nationality.id === row.original.nationalityId)?.name,
      sortingFn: (rowA, rowB) => {
        const nationalityA = nationalities.data?.find(({ id }) => id === rowA.original.nationalityId)?.name || '';
        const nationalityB = nationalities.data?.find(({ id }) => id === rowB.original.nationalityId)?.name || '';

        return nationalityA.localeCompare(nationalityB);
      },
      meta: {
        renderFilter: () => (
          <SelectField
            placeholder="--Выбрать--"
            options={(nationalities.data || []).map((nationality) => ({ value: nationality.id.toString(), label: nationality.name }))}
            value={filter.nationality || ''}
            onChange={(value) => setFilter((prev) => ({ ...prev, nationality: value }))}
          />
        ),
      }
    },
    {
      id: 'socialLinks',
      accessorKey: 'socialLinks',
      header: 'Социальные сети',
      size: 148,
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2 items-center">
          {row.original.socialLink?.facebook &&
            <a
              className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none"
              href={row.original.socialLink.facebook}
              target="_blank"
            >
              <Icons.facebook width={24} height={24} />
            </a>}
          {row.original.socialLink?.instagram &&
            <a
              className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none"
              href={row.original.socialLink?.instagram}
              target="_blank"
            >
              <Icons.instagram width={24} height={24} />
            </a>}
          {row.original.socialLink?.telegram &&
            <a
              className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none"
              href={row.original.socialLink?.telegram}
              target="_blank"
            >
              <Icons.telegram width={24} height={24} />
            </a>}
          {row.original.socialLink?.odnoklassniki &&
            <a
              className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none"
              href={row.original.socialLink?.odnoklassniki}
              target="_blank"
            >
              <Icons.odnoklassniki width={24} height={24} />
            </a>}
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <header className="flex justify-between px-3 items-end mb-1">
          <h1 className="title">
            Справочник пользователей ({users.data?.length})
          </h1>
        </header>

        {users.data ? (
          <DataTable
            data={filterUsers(users.data, filter)}
            columns={columns}
            sortingState={[{
              id: 'name',
              desc: false,
            }]}
            actions={(
              <Button
                icon="add"
                variant="success"
                href={AppRoute.Users.Create}
              >
                <span className="sr-only md:not-sr-only">Добавить</span>
              </Button>
            )}
          />
        ) : (
          <Spinner className="w-8 h-8" />
        )}
      </main>

      <Modal isOpen={isCreating}>
        <UsersCreateForm setIsOpen={setIsCreating} />
      </Modal>
    </AppLayout>
  );
}

export default UsersPage;
