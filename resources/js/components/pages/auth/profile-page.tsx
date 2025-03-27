import PageLayout from '@/components/layouts/page-layout';
import BaseInfo from '@/components/layouts/users/base-info';
import Deletion from '@/components/layouts/users/deletion';
import Details from '@/components/layouts/users/details';
import PhoneNumbers from '@/components/layouts/users/phone-numbers';
import RoleInfo from '@/components/layouts/users/role-info';
import SocialLinks from '@/components/layouts/users/social-links';
import UserHeader from '@/components/layouts/users/user-header';
import UserProfileNavigation from '@/components/layouts/users/user-profile-navigation';
import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';

function ProfilePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const authUser = useAppSelector(getAuthUser);
  const user = users.data?.find((user) => user.id === authUser?.id) || null;

  useEffect(() => {
    if (!user && authUser && !users.isFetching) dispatch(fetchUsersAction());
  }, [authUser, dispatch, user, users.isFetching]);

  if (!user || !users.data) {
    return (
      <Spinner className="w-8 h-8 m-2" />
    );
  }

  return (
    <PageLayout>
      <main className="pt-4 pb-40">
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

export default ProfilePage;
