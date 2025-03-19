import PageLayout from '@/components/layouts/page-layout';
import BaseInfo from '@/components/layouts/users/base-info';
import Deletion from '@/components/layouts/users/deletion';
import Details from '@/components/layouts/users/details';
import PhoneNumbers from '@/components/layouts/users/phone-numbers';
import RoleInfo from '@/components/layouts/users/role-info';
import SocialLinks from '@/components/layouts/users/social-links';
import UserHeader from '@/components/layouts/users/user-header';
import UserProfileNavigation from '@/components/layouts/users/user-profile-navigation';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UsersShowPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const users = useAppSelector(getUsers);
  const user = users.data?.find((user) => user.id === +(params.id || 0)) || null;

  useEffect(() => {
    if (!user && params.id && !users.isFetching) dispatch(fetchUsersAction());
  }, [user, params.id, dispatch, users.isFetching]);

  if (!user || !users.data) {
    return (
      <Spinner className="w-8 h-8 m-2" />
    );
  }

  return (
    <PageLayout>
      <main className="pt-4 pb-40">
        <Breadcrumbs
          className="mb-4"
          items={[
            ['Справочник пользователей', AppRoute.Users.Index],
            [user.name, ''],
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
    </PageLayout>
  );
}

export default UsersShowPage;
