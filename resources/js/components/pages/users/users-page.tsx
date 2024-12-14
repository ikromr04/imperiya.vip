import React, { useEffect } from 'react';
import PageLayout from '../../layouts/page-layout';
import Button from '../../ui/button';
import { UsersSearchForm } from '../../forms/users-search-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getUsers } from '../../../store/users-slice/users-selector';
import { fetchUsersAction } from '../../../store/users-slice/users-api-actions';
import UsersTable from '../../users-table/users-table';
import Spinner from '../../ui/spinner';

export default function UsersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);

  useEffect(() => {
    if (!users) dispatch(fetchUsersAction());
  }, [users, dispatch]);

  return (
    <PageLayout>
      <main className="relative flex flex-col h-full">
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
            <UsersSearchForm className="grow" />

            <Button
              className="border border-l-0 rounded-none"
              type="button"
              icon="filter"
              variant="text"
            >
              <span className="sr-only md:not-sr-only">Фильтр</span>
            </Button>
          </div>
        </header>

        {users
          ? <UsersTable className="h-[calc(100%-80px)] md:h-[calc(100%-88px)]" users={users} />
          : <Spinner className="w-8 h-8" />}
      </main>
    </PageLayout>
  );
}
