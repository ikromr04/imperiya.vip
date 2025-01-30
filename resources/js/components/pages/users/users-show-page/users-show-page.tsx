import PageLayout from '@/components/layouts/page-layout';
import UserHeader from '@/components/layouts/users/user-header';
import UserProfileNavigation from '@/components/layouts/users/user-profile-navigation';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BaseInfo from './base-info';
import RoleInfo from './role-info';
import Details from './details';
import PhoneNumbers from './phone-numbers';
import SocialLinks from './social-links';

function UsersShowPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const users = useAppSelector(getUsers);
  const user = users?.find((user) => user.id === +(params.userId || 0)) || null;

  useEffect(() => {
    if (!user && params.userId) dispatch(fetchUsersAction());
  }, [user, params.userId, dispatch]);

  if (!user || !users) {
    return (
      <PageLayout>
        <Spinner className="w-8 h-8" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <main className="overflow-y-auto p-2 -m-2 no-scrollbar">
        <Breadcrumbs
          className="mb-2"
          items={[
            ['Справочник пользователей', AppRoute.Users.Index],
            [user.name, ''],
          ]}
        />

        <UserHeader users={users} user={user} />

        <UserProfileNavigation user={user} />

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
    </PageLayout>
  );
}

export default UsersShowPage;
