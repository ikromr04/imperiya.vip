import BaseInfo from './base-info';
import Deletion from './deletion';
import Details from './details';
import PhoneNumbers from './phone-numbers';
import RoleInfo from './role-info';
import SocialLinks from './social-links';
import UserHeader from './user-header';
import UserProfileNavigation from './user-profile-navigation';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/layouts/app-layout';

function SuperadminUsersShow(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const users = useAppSelector(getUsers);
  const user = users.data?.find((user) => user.id === +(params.id || 0)) || null;

  useEffect(() => {
    if (!user && params.id && !users.isFetching) dispatch(fetchUsersAction());
  }, [user, params.id, dispatch, users.isFetching]);

  if (!user || !users.data) {
    return (
      <AppLayout>
        <Spinner className="w-8 h-8 m-2" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <Breadcrumbs
          className="mb-4"
          items={[
            ['Справочник пользователей', AppRoute.Users.Index],
            [`${user.name} ${user.surname}`, ''],
          ]}
        />

        <UserHeader users={users.data} user={user} />

        <UserProfileNavigation user={user} />

        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[3fr_1fr]">
          <div className="flex flex-col gap-4 grow">
            <BaseInfo user={user} />
            <RoleInfo users={users.data} user={user} />
          </div>

          <div className="flex flex-col gap-4">
            <Details user={user} />
            <PhoneNumbers user={user} />
            <SocialLinks user={user} />
            <div className="ml-auto">
              <Deletion user={user} />
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default SuperadminUsersShow;
