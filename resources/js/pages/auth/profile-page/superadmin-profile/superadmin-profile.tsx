import BaseInfo from '@/pages/users-show-page/superadmin-users-show/base-info';
import Deletion from '@/pages/users-show-page/superadmin-users-show/deletion';
import Details from '@/pages/users-show-page/superadmin-users-show/details';
import PhoneNumbers from '@/pages/users-show-page/superadmin-users-show/phone-numbers';
import RoleInfo from '@/pages/users-show-page/superadmin-users-show/role-info';
import SocialLinks from '@/pages/users-show-page/superadmin-users-show/social-links';
import UserProfileNavigation from '@/pages/users-show-page/superadmin-users-show/user-profile-navigation';
import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import Header from './header';

function SuperadminProfile(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const user = useAppSelector(getAuthUser);

  useEffect(() => {
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
  }, [dispatch, users.data, users.isFetching]);

  if (!users.data || !user) {
    return (
      <AppLayout>
        <Spinner className="w-8 h-8 m-2" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <Header user={user} />

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

export default SuperadminProfile;
