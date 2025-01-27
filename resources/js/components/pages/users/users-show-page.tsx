import { Icons } from '@/components/icons';
import PageLayout from '@/components/layouts/page-layout';
import Button from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import UserAvatar from '@/components/ui/user-avatar';
import { AppRoute } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { getNextUserId, getPreviousUserId } from '@/utils/users';
import React, { useEffect } from 'react';
import { generatePath, useParams } from 'react-router-dom';

function UsersShowPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const users = useAppSelector(getUsers);
  const user = users?.find((user) => user.id === +(params.userId || 0)) || null;

  useEffect(() => {
    if (!user && params.userId) {
      dispatch(fetchUsersAction());
    }
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
      <main>
        <header className="relative z-0 lg:flex lg:items-top lg:gap-4">
          <UserAvatar
            className="mb-2"
            user={user}
          />

          <div className="lg:grow mt-20">
            <h1 className="title mb-1">{user.name}</h1>
            <span className="flex max-w-max text-center bg-blue-200 text-primary rounded-full text-sm py-1 px-2 leading-none">
              {user.role.name}
            </span>
          </div>

          <div className="absolute top-28 right-0 flex items-center gap-1 lg:static lg:top-0 lg:items-start lg:mt-20">
            <Button
              variant="light"
              href={generatePath(AppRoute.Users.Show, { userId: getPreviousUserId(users, user.id) })}
            >
              <Icons.previous width={14} height={14} />
              <span className="sr-only md:not-sr-only">Предыдущий</span>
            </Button>
            <Button
              variant="light"
              href={generatePath(AppRoute.Users.Show, { userId: getNextUserId(users, user.id) })}
            >
              <span className="sr-only md:not-sr-only">Следующий</span>
              <Icons.next width={14} height={14} />
            </Button>
          </div>
        </header>
      </main>
    </PageLayout>
  );
}

export default UsersShowPage;
