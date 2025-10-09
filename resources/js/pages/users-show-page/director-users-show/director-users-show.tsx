import BaseInfo from './base-info/base-info';
import Details from './details';
import PhoneNumbers from './phone-numbers';
import SocialLinks from './social-links';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AsyncStatus } from '@/const/store';
import { getNationalitiesStatus } from '@/store/nationalities-slice/nationalities-selector';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import { getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import Header from './header/header';
import Navigation from './navigation';
import NotFoundPage from '@/pages/not-found-page';
import RoleInfo from './role-info/role-info';

function DirectorUsersShow(): JSX.Element {
  const params = useParams();

  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(getUsersStatus);
  const nationalitiesStatus = useAppSelector(getNationalitiesStatus);
  const gradesStatus = useAppSelector(getGradesStatus);

  const users = useAppSelector(getUsers);
  const user = users?.find((user) => user.id === +(params.id || 0)) || null;

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (nationalitiesStatus === AsyncStatus.Idle) dispatch(fetchNationalitiesAction());
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
  }, [dispatch, gradesStatus, nationalitiesStatus, usersStatus]);

  if (!users) {
    return <Spinner className="w-8 h-8 m-2" />;
  }

  if (!user) {
    return <NotFoundPage />;
  }

  return (
    <main className="pt-2 pb-40">
      <Breadcrumbs
        className="mb-4"
        items={[
          ['Справочник пользователей', AppRoute.Users.Index],
          [`${user.name} ${user.surname}`, ''],
        ]}
      />

      <Header users={users} user={user} />

      <Navigation user={user} />

      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-4 grow">
          <BaseInfo user={user} />
          <RoleInfo user={user} />
        </div>

        <div className="flex flex-col gap-4">
          <Details user={user} />
          <PhoneNumbers user={user} />
          <SocialLinks user={user} />
        </div>
      </div>
    </main>
  );
}

export default DirectorUsersShow;
