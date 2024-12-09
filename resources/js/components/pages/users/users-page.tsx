import React, { useEffect } from 'react';
import PageLayout from '../../layouts/page-layout';
import Button from '../../ui/button';
import { UsersSearchForm } from '../../forms/users-search-form';
import Tooltip from '../../ui/tooltip';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getUsers } from '../../../store/users-slice/users-selector';
import { fetchUsersAction } from '../../../store/users-slice/users-api-actions';

export default function UsersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsersAction());
    }
  }, [users, dispatch]);

  console.log(users);

  return (
    <PageLayout>
      <main>
        <header className="flex flex-col gap-2">
          <div className="flex items-end justify-between gap-2">
            <h1 className="title grow">
              Справочник пользователей
            </h1>

            <Button
              type="button"
              icon="fileExport"
              variant="light"
            >
              <span className="sr-only">Экспорт</span>
            </Button>
            <Button
              type="button"
              icon="add"
              variant="success"
            >
              <span className="sr-only">Добавить пользователя</span>
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
              <span className="sr-only">Фильтр</span>
            </Button>
            <Button
              className="rounded-none border border-l-0 rounded-r-md"
              type="button"
              icon="gridView"
              variant="text"
            >
              <Tooltip label="Таблица" position="bottom" />
            </Button>
          </div>
        </header>
        <p>Отображение 1 - 64 из {users?.length}</p>
      </main>
    </PageLayout>
  );
}
