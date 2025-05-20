import React, { BaseSyntheticEvent, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { fetchUsersAction, updateUserAction } from '@/store/users-slice/users-api-actions';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import { User, UserId, UsersFilter } from '@/types/users';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Icons } from '@/components/icons';
import { REGIONS, RoleName, ROLES, SexName } from '@/const/users';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import dayjs from 'dayjs';
import TextField from '@/components/ui/form-controls/text-field';
import { exportUsersToExcel, filterUsers } from '@/utils/users';
import SelectField from '@/components/ui/form-controls/select-field';
import Button from '@/components/ui/button';
import { getNationalities, getNationalitiesStatus } from '@/store/nationalities-slice/nationalities-selector';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import { getProfessions, getProfessionsStatus } from '@/store/professions-slice/professions-selector';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import CopyButton from '@/components/ui/copy-button';
import { toast } from 'react-toastify';
import { AsyncStatus } from '@/const/store';
import DataTable from './data-table/data-table';

function SuperadminUsers(): ReactNode {
  const dispatch = useAppDispatch();

  const usersStatus = useAppSelector(getUsersStatus);
  const gradesStatus = useAppSelector(getGradesStatus);
  const nationalitiesStatus = useAppSelector(getNationalitiesStatus);
  const professionsStatus = useAppSelector(getProfessionsStatus);

  const users = useAppSelector(getUsers);
  const grades = useAppSelector(getGrades);
  const nationalities = useAppSelector(getNationalities);
  const professions = useAppSelector(getProfessions);

  const [filter, setFilter] = useState<UsersFilter>({});

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (nationalitiesStatus === AsyncStatus.Idle) dispatch(fetchNationalitiesAction());
    if (professionsStatus === AsyncStatus.Idle) dispatch(fetchProfessionsAction());
  }, [dispatch, gradesStatus, nationalitiesStatus, professionsStatus, usersStatus]);

  const toggleBlockUser = (id: UserId, block: boolean) => () => {
    dispatch(updateUserAction({
      id,
      dto: { blocked_at: block ? dayjs().format('YYYY-MM-DD HH:mm:ss') : null },
      onFail: toast.error,
    }));
  };

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
        <Link className="flex leading-none" to={generatePath(AppRoute.Users.Show, { id: row.original.id })}>
          {row.original.surname} {row.original.name} {row.original.patronymic}
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
        const grade = grades?.find(({ id }) => id === row.original.student?.gradeId);
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
        const gradeA = grades?.find(({ id }) => id === rowA.original.student?.gradeId)?.level.toString() || '';
        const gradeB = grades?.find(({ id }) => id === rowB.original.student?.gradeId)?.level.toString() || '';

        return gradeA.localeCompare(gradeB);
      },
      enableColumnFilter: filter.grade ? true : false,
      meta: {
        renderFilter: () => (
          <SelectField
            placeholder="--Выбрать--"
            options={(grades || []).map((grade) => ({ value: grade.id.toString(), label: `${grade.level} ${grade.group}` }))}
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
      id: 'password',
      accessorKey: 'password',
      header: 'Пароль',
      size: 220,
      enableColumnFilter: filter.password ? true : false,
      cell: ({ row }) => (
        <CopyButton string={row.original.password ?? ''}>
          Скопировать
        </CopyButton>
      ),
      meta: {
        renderFilter: () => (
          <TextField
            value={filter.password || ''}
            onInput={(evt: BaseSyntheticEvent) => setFilter((prev) => ({ ...prev, password: evt.target.value }))}
            onChange={(value) => setFilter((prev) => ({ ...prev, password: value as string }))}
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
      enableColumnFilter: (filter.address?.physicalAddress || filter.address?.region) ? true : false,
      cell: ({ row }) => row.original.address && (
        <div className="leading-[1.1]">
          {(row.original.address.region !== 'За пределами города') && 'район '}
          {row.original.address.region}, {row.original.address.physicalAddress}
        </div>
      ),
      sortingFn: (rowA, rowB) => {
        const addressA = rowA.original.address ? `${rowA.original.address.region}, ${rowA.original.address.physicalAddress}` : '';
        const addressB = rowB.original.address ? `${rowB.original.address.region}, ${rowB.original.address.physicalAddress}` : '';

        return addressA.localeCompare(addressB);
      },
      meta: {
        renderFilter: () => (
          <div className="flex flex-col gap-2">
            <TextField
              placeholder="Искать..."
              value={filter.address?.physicalAddress || ''}
              onInput={(evt: BaseSyntheticEvent) => setFilter((prev) => ({
                ...prev,
                address: {
                  physicalAddress: evt.target.value,
                  region: prev.address?.region || '',
                },
              }))}
              onChange={(value) => setFilter((prev) => ({
                ...prev,
                address: {
                  physicalAddress: value as string,
                  region: prev.address?.region || '',
                },
              }))}
            />

            <SelectField
              placeholder="--Район--"
              options={REGIONS.map((region) => ({ value: region, label: region }))}
              value={filter.address?.region || ''}
              onChange={(value) => setFilter((prev) => ({
                ...prev,
                address: {
                  physicalAddress: prev.address?.physicalAddress || '',
                  region: value,
                },
              }))}
            />
          </div>
        ),
      }
    },
    {
      id: 'nationality',
      accessorKey: 'nationality',
      header: 'Национальность',
      size: 160,
      enableColumnFilter: filter.nationality ? true : false,
      cell: ({ row }) => nationalities?.find((nationality) => nationality.id === row.original.nationalityId)?.name,
      sortingFn: (rowA, rowB) => {
        const nationalityA = nationalities?.find(({ id }) => id === rowA.original.nationalityId)?.name || '';
        const nationalityB = nationalities?.find(({ id }) => id === rowB.original.nationalityId)?.name || '';

        return nationalityA.localeCompare(nationalityB);
      },
      meta: {
        renderFilter: () => (
          <SelectField
            placeholder="--Выбрать--"
            options={(nationalities || []).map((nationality) => ({ value: nationality.id.toString(), label: nationality.name }))}
            value={filter.nationality || ''}
            onChange={(value) => setFilter((prev) => ({ ...prev, nationality: value }))}
          />
        ),
      }
    },
    {
      id: 'profession',
      accessorKey: 'profession',
      header: 'Сфера деятельности',
      size: 200,
      enableColumnFilter: filter.professionId ? true : false,
      cell: ({ row }) => professions && row.original.parent?.professionId && (
        professions.find(({ id }) => id === row.original.parent?.professionId)?.name
      ),
      sortingFn: (rowA, rowB) => {
        const professionA = professions?.find(({ id }) => id === rowA.original.parent?.professionId)?.name || '';
        const professionB = professions?.find(({ id }) => id === rowB.original.parent?.professionId)?.name || '';

        return professionA.localeCompare(professionB);
      },
      meta: {
        renderFilter: () => (
          <div className="flex flex-col gap-2">
            <SelectField
              options={(professions || []).map((profession) => ({ value: profession.id.toString(), label: profession.name }))}
              value={filter.professionId || ''}
              onChange={(value) => setFilter((prev) => ({
                ...prev,
                professionId: value,
              }))}
            />
          </div>
        ),
      }
    },
    {
      id: 'blockedAt',
      accessorKey: 'blockedAt',
      header: 'Блокировка',
      size: 160,
      cell: ({ row }) => row.original.blockedAt ? (
        <>
          <Button
            className="mb-1"
            variant="danger"
            onClick={toggleBlockUser(row.original.id, false)}
          >
            Разблокировать
          </Button>
          <span className="flex text-sm leading-none text-danger">
            Заблокирован с <br /> {dayjs(row.original.blockedAt).format('DD MMMM YYYY HH:mm')}
          </span>
        </>
      ) : (
        <Button
          variant="light"
          onClick={toggleBlockUser(row.original.id, true)}
        >
          Заблокировать
        </Button>
      ),
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
    <main className="flex flex-col gap-y-1 py-2">
      <h1 className="title">
        Пользователи ({users?.length})
      </h1>

      {users ? (
        <DataTable
          data={filterUsers(users, filter)}
          columns={columns}
          searchValue={filter.name}
          onSearchInput={(evt) => setFilter((prev) => ({
            ...prev,
            name: evt.target.value,
          }))}
          sortingState={[{
            id: 'name',
            desc: false,
          }]}
          onExport={(users, columnVisibility) => exportUsersToExcel(users, columnVisibility, { grades, nationalities, professions })}
          actions={(
            <Button
              className="max-h-7"
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
  );
}

export default SuperadminUsers;
