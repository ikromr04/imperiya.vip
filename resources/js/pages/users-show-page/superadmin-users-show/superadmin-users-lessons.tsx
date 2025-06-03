import React, { lazy, ReactNode, Suspense, useEffect } from 'react';
import Spinner from '@/components/ui/spinner';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { AsyncStatus } from '@/const/store';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { AppRoute } from '@/const/routes';
import Header from './header/header';
import Navigation from './navigation';

const StudentLessonsTable = lazy(() => import('@/components/lessons-table/student-lessons-table/student-lessons-table'));
const TeacherLessonsTable = lazy(() => import('@/components/lessons-table/teacher-lessons-table/teacher-lessons-table'));

function SuperadminUsersLessons(): ReactNode {
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
        <Suspense fallback={<Spinner className="w-10 h-10" />}>
          {user?.role === 'student' && <StudentLessonsTable />}
          {user?.role === 'teacher' && <TeacherLessonsTable />}
        </Suspense>
      </div>
    </main>
  );
}

export default SuperadminUsersLessons;
