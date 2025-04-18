import UserAvatar from '@/pages/users-show-page/superadmin-users-show/user-avatar';
import { RoleName } from '@/const/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { User } from '@/types/users';
import React, { useEffect } from 'react';

type HeaderProps = {
  user: User;
};

function Header({
  user,
}: HeaderProps): JSX.Element {
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
        <h1 className="title mb-1">{user.name} {user.surname}</h1>

        <span className="flex max-w-max text-center bg-blue-200 text-primary rounded-full text-sm py-1 px-2 leading-none">
          {RoleName[user.role]} {grade && `${grade?.level} ${grade.group}`}
        </span>
      </div>
    </header>
  );
}

export default Header;
