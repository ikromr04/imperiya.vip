import { RoleName } from '@/const/users';
import React, { memo, ReactNode } from 'react';
import { useAppSelector } from '@/hooks';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { getAuthUser } from '@/store/auth-slice/auth-selector';

function Header(): ReactNode {
  const user = useAppSelector(getAuthUser);
  const grades = useAppSelector(getGrades);
  const grade = grades?.find(({ id }) => id === user?.student?.gradeId);

  if (!user) return;

  return (
    <header className="relative z-10 lg:flex lg:items-top lg:gap-4">
      <div className="relative z-10 w-36 mb-2 lg:mb-0">
        <div>
          <img
            className="block w-full h-full rounded-full object-cover border-[2px] border-white"
            src={user.avatarThumb || '/images/avatar.png'}
            width={144}
            height={144}
            alt={user.name}
          />
        </div>
      </div>

      <div className="lg:grow lg:mt-20">
        <h1 className="title mb-1">{user.surname} {user.name}</h1>

        <span className="flex max-w-max text-center bg-blue-200 text-primary rounded-full text-sm py-1 px-2 leading-none">
          {RoleName[user.role]} {grade && `${grade?.level} ${grade.group}`}
        </span>
      </div>
    </header>
  );
}

export default memo(Header);
