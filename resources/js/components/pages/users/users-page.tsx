import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { filterUsers } from '@/utils/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUsers } from '@/store/users-slice/users-selector';
import { getUsersFilter } from '@/store/app-slice/app-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import PageLayout from '@/components/layouts/page-layout';
import Button from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { setUsersFilterAction } from '@/store/app-slice/app-slice';
import { defaultUsersFilter } from '@/services/app-settings';
import UsersTable from '@/components/blocks/users-table';
import Spinner from '@/components/ui/spinner';
import UsersFilterForm from '@/components/forms/users-filter-form/users-filter-form';
import Modal from '@/components/ui/modal';

function UsersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const usersFilter = useAppSelector(getUsersFilter);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isUserCreateModalOpen, setIsUserCreateModalOpen] = useState(false);

  const handleExport = () => {
    const sheetData = filterUsers(users || [], usersFilter).map((user) => {
      const obj = {};

      if (usersFilter.name.visibility) Object.assign(obj, { 'ФИО': user.name });
      if (usersFilter.gender.visibility) Object.assign(obj, { 'Пол': user.gender?.name });
      if (usersFilter.roles.visibility) Object.assign(obj, { 'Позиция': user.role.name });
      if (usersFilter.grades.visibility) Object.assign(obj, { 'Класс': `${user.role.grade?.level || ''} ${user.role.grade?.group || ''}` });
      if (usersFilter.phoneNumber.visibility) Object.assign(obj, { 'Телефоны': user.phoneNumbers?.map((phone) => `+${phone.code} ${phone.numbers}`).join(', ') });
      if (usersFilter.email.visibility) Object.assign(obj, { 'Электронная почта': user.email || '' });
      if (usersFilter.login.visibility) Object.assign(obj, { 'Логин': user.login });
      if (usersFilter.birthDate.visibility) Object.assign(obj, { 'Дата рождения': dayjs(user.birthDate).format('DD MMMM YYYY') || '' });
      if (usersFilter.address.visibility) Object.assign(obj, { 'Адрес': user.address || '' });
      if (usersFilter.nationalities.visibility) Object.assign(obj, { 'Национальность': user.nationality?.name || '' });

      return obj;
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sheetData);

    XLSX.utils.book_append_sheet(wb, ws, 'users');
    XLSX.writeFile(wb, 'imperiya.vip_users_sheet.xlsx');
  };

  useEffect(() => {
    if (!users) dispatch(fetchUsersAction());
  }, [users, dispatch]);

  return (
    <PageLayout>
      <main className={classNames(
        'relative flex flex-col h-full transition-all duration-300',
        isFilterOpen ? 'mr-[264px] md:mr-[272px]' : 'mr-0',
      )}>
        <header className="top flex flex-col gap-2 mb-2 md:mb-3 md:gap-3 min-w-64">
          <div className="flex items-end justify-between gap-2">
            <h1 className="relative flex mr-auto title overflow-scroll no-scrollbar whitespace-nowrap pr-6">
              Справочник пользователей
            </h1>
            <div className="relative z-10 min-w-6 h-full pointer-events-none -ml-7 bg-gradient-to-l from-gray-100 to-transparent"></div>

            <Button
              type="button"
              icon="fileExport"
              variant="light"
              onClick={handleExport}
            >
              <span className="sr-only md:not-sr-only">Экспорт</span>
            </Button>
            <Button
              className="min-w-max"
              type="button"
              icon="add"
              variant="success"
              onClick={() => setIsUserCreateModalOpen(true)}
            >
              <span className="sr-only md:not-sr-only">Добавить пользователя</span>
            </Button>
          </div>

          <div className="flex bg-white rounded-md">
            <div className="relative flex grow">
              <div className="absolute left-[1px] top-[1px] rounded-r-[3px] transform w-[30px] h-[30px] flex justify-center items-center">
                <Icons.usersSearch width={14} />
              </div>
              <input
                className="flex grow bg-white min-w-0 w-4 border border-gray-200 rounded-l h-8 pl-8 pr-4 leading-none text-base focus:outline-none focus:border-primary"
                type="search"
                value={usersFilter.searchKeyword}
                onInput={(evt: BaseSyntheticEvent) => dispatch(setUsersFilterAction({ ...usersFilter, searchKeyword: evt.target.value.toLowerCase() }))}
                placeholder="Поиск по имени, логину, электронной почте или номеру телефона"
              />
              {usersFilter.searchKeyword &&
                <button
                  className="absolute top-1/2 right-0 flex items-center justify-center h-full w-8 transform -translate-y-1/2"
                  type="button"
                  onClick={() => dispatch(setUsersFilterAction({ ...usersFilter, searchKeyword: '' }))}
                >
                  <Icons.close width={12} />
                </button>}
            </div>

            <Button
              className="relative border border-l-0 rounded-l-none"
              type="button"
              icon="filter"
              variant="text"
              iconClassname={classNames(
                'transition-all duration-300 transform',
                isFilterOpen && '-scale-x-[1]'
              )}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="sr-only md:not-sr-only">Фильтр</span>
              {JSON.stringify(usersFilter) !== JSON.stringify(defaultUsersFilter) &&
                <sup className="absolute top-1 right-2">
                  <Icons.info className="text-error" height={8} />
                </sup>}
            </Button>
          </div>
        </header>

        {users
          ? <UsersTable className="h-[calc(100%-80px)] md:h-[calc(100%-88px)] min-w-64" users={filterUsers(users, usersFilter)} />
          : <Spinner className="w-8 h-8" />}

        <section className={classNames(
          'absolute top-0 left-[calc(100%+8px)] z-10 flex flex-col w-64 h-full py-2 p-4 rounded bg-white border transition-all duration-300 md:left-[calc(100%+16px)]',
          !isFilterOpen ? 'invisible opacity-0' : 'visible opacity-100',
        )}>
          <h2 className="flex items-center justify-between title mb-2">
            Фильтр

            <Button
              variant="text"
              onClick={() => setIsFilterOpen(false)}
            >
              <Icons.west className="transform scale-x-[-1]" width={16} />
            </Button>
          </h2>
          <UsersFilterForm className="grow max-h-[calc(100%-48px)]" />
        </section>

        <Modal isOpen={isUserCreateModalOpen}>
          {/* <CreateUserForm setIsOpen={setIsUserCreateModalOpen} /> */}
        </Modal>
      </main>
    </PageLayout>
  );
}

export default UsersPage;
