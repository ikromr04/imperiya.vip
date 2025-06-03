import React, { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { AsyncStatus } from '@/const/store';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { AppRoute } from '@/const/routes';
import Header from './header/header';
import Navigation from './navigation';
import StudentDiaryTable from '@/components/diary-table/student-diary-table';

function SuperadminUsersDiary(): ReactNode {
  const params = useParams();
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(getUsersStatus);

  const users = useAppSelector(getUsers);
  const user = users?.find((user) => user.id === +(params.id || 0)) || null;

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
  }, [dispatch, usersStatus]);

  if (!user || !users) return null;

  return (
    <main className="pt-2 pb-40">
      <Breadcrumbs
        className="mb-4"
        items={[
          ['Пользователи', AppRoute.Users.Index],
          [`${user.name} ${user.surname}`, ''],
        ]}
      />

      <Header users={users} user={user} />

      <Navigation user={user} />

      <div className="flex flex-col gap-4">
        <StudentDiaryTable />
      </div>
    </main>
  );
}

export default SuperadminUsersDiary;
