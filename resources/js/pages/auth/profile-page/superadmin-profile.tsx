import BaseInfo from '@/pages/users/users-show-page/base-info';
import Deletion from '@/pages/users/users-show-page/deletion';
import Details from '@/pages/users/users-show-page/details';
import PhoneNumbers from '@/pages/users/users-show-page/phone-numbers';
import RoleInfo from '@/pages/users/users-show-page/role-info';
import SocialLinks from '@/pages/users/users-show-page/social-links';
import UserProfileNavigation from '@/pages/users/users-show-page/user-profile-navigation';
import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import AppLayout from '@/components/layouts/app-layout';
import Header from './header';
import { User } from '@/types/users';

type SuperadminProfileProps = {
  user: User;
};

function SuperadminProfile({
  user,
}: SuperadminProfileProps): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);

  useEffect(() => {
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
  }, [dispatch, user, users.data, users.isFetching]);

  if (!users.data) {
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
