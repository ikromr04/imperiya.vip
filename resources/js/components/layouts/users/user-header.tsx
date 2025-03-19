import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import UserAvatar from '@/components/ui/user-avatar';
import { AppRoute } from '@/const/routes';
import { RoleName } from '@/const/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { User, Users } from '@/types/users';
import { getNextUserId, getPreviousUserId } from '@/utils/users';
import React, { useEffect } from 'react';
import { generatePath } from 'react-router-dom';

type UserHeaderProps = {
  users: Users;
  user: User;
};

function UserHeader({
  users,
  user,
}: UserHeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const grades = useAppSelector(getGrades);
  const grade = grades.data?.find(({ id }) => id === user.student?.gradeId);

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
  }, [dispatch, grades.data, grades.isFetching]);

  return (
    <header className="relative z-10 lg:flex lg:items-top lg:gap-4">
      <UserAvatar className="mb-2 lg:mb-0" user={user} />

      <div className="lg:grow lg:mt-20">
        <h1 className="title mb-1">{user.name}</h1>
        <span className="flex max-w-max text-center bg-blue-200 text-primary rounded-full text-sm py-1 px-2 leading-none">
          {RoleName[user.role]} {grade && `${grade?.level} ${grade.group}`}
        </span>
      </div>

      <div className="absolute top-28 right-0 z-10 flex items-center gap-1 lg:static lg:top-0 lg:items-start lg:mt-20">
        <Button
          variant="light"
          href={generatePath(AppRoute.Users.Show, { id: getPreviousUserId(users, user.id) })}
        >
          <Icons.previous width={14} height={14} />
          <span className="sr-only md:not-sr-only">Предыдущий</span>
        </Button>
        <Button
          variant="light"
          href={generatePath(AppRoute.Users.Show, { id: getNextUserId(users, user.id) })}
        >
          <span className="sr-only md:not-sr-only">Следующий</span>
          <Icons.next width={14} height={14} />
        </Button>
      </div>
    </header>
  );
}

export default UserHeader;
