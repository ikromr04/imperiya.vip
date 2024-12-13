import React, { useEffect } from 'react';
import PageLayout from '../../layouts/page-layout';
import Button from '../../ui/button';
import { UsersSearchForm } from '../../forms/users-search-form';
import Tooltip from '../../ui/tooltip';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getUsers } from '../../../store/users-slice/users-selector';
import { fetchUsersAction } from '../../../store/users-slice/users-api-actions';
import UsersList from '../../users-list';
import { useLocation } from 'react-router-dom';

export default function UsersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const searchParams = new URLSearchParams(useLocation().search);
  const view = searchParams.get('view');

  useEffect(() => {
    if (!users) dispatch(fetchUsersAction());
  }, [users, dispatch]);

  return (
    <PageLayout>
      <main className="flex flex-col h-full">
        <header className="top flex flex-col gap-2 mb-2">
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
            <Button
              className="rounded-none border border-l-0 rounded-r-md"
              type="button"
              icon={view === 'list' ? 'list' : 'grid'}
              variant="text"
              href={`?view=${view === 'list' ? 'grid' : 'list'}`}
            >
              <Tooltip label={view === 'list' ? 'Список' : 'Таблица'} position="top" />
            </Button>
          </div>
        </header>

        <UsersList className="h-[calc(100%-80px)]" users={users} />
      </main>
    </PageLayout>
  );
}
