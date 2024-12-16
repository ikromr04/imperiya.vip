import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import PageLayout from '../../layouts/page-layout';
import Button from '../../ui/button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getUsers } from '../../../store/users-slice/users-selector';
import { fetchUsersAction } from '../../../store/users-slice/users-api-actions';
import UsersTable from '../../users-table';
import Spinner from '../../ui/spinner';
import { Icons } from '../../icons';
import { filterUsers } from '../../../utils';
import UsersFilterForm from '../../forms/users-filter-form';
import { getUsersFilter } from '../../../store/app-slice/app-selector';

export default function UsersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const usersFilter = useAppSelector(getUsersFilter);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    if (!users) dispatch(fetchUsersAction());
  }, [users, dispatch]);

  return (
    <PageLayout>
      <main className="relative mr-[264px] flex flex-col h-full">
        <header className="top flex flex-col gap-2 mb-2 md:mb-3 md:gap-3">
          <div className="flex items-end justify-between gap-2">
            <h1 className="relative flex mr-auto title overflow-scroll no-scrollbar whitespace-nowrap pr-6">
              Справочник пользователей
            </h1>
            <div className="relative z-10 min-w-6 h-full pointer-events-none -ml-7 bg-gradient-to-l from-gray-100 to-transparent"></div>

            <Button
              type="button"
              icon="fileExport"
              variant="light"
            >
              <span className="sr-only md:not-sr-only">Экспорт</span>
            </Button>
            <Button
              className="min-w-max"
              type="button"
              icon="add"
              variant="success"
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
                value={searchKeyword}
                onInput={(evt: BaseSyntheticEvent) => setSearchKeyword(evt.target.value.toLowerCase())}
                placeholder="Поиск по имени, логину, электронной почте или номеру телефона"
              />
              {searchKeyword &&
                <button
                  className="absolute top-1/2 right-0 flex items-center justify-center h-full w-8 transform -translate-y-1/2"
                  type="button"
                  onClick={() => setSearchKeyword('')}
                >
                  <Icons.close width={12} />
                </button>}
            </div>

            <Button
              className="border border-l-0 rounded-l-none"
              type="button"
              icon="filter"
              variant="text"
            >
              <span className="sr-only md:not-sr-only">Фильтр</span>
            </Button>
          </div>
        </header>

        {users
          ? <UsersTable className="h-[calc(100%-80px)] md:h-[calc(100%-88px)]" users={filterUsers(users, searchKeyword, usersFilter)} />
          : <Spinner className="w-8 h-8" />}

        <section className="absolute top-0 left-full z-10 flex flex-col w-64 h-full py-1 p-2 rounded bg-white shadow">
          <h2 className="title !text-lg">Фильтр пользователей</h2>

          <UsersFilterForm />
        </section>
      </main>
    </PageLayout>
  );
}
