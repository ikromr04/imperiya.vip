import AppLayout from '@/components/layouts/app-layout';
import { User } from '@/types/users';
import React from 'react';
import Header from './header';
import BaseInfo from '@/pages/users/users-show-page/base-info';
import Details from '@/pages/users/users-show-page/details';
import PhoneNumbers from '@/pages/users/users-show-page/phone-numbers';
import SocialLinks from '@/pages/users/users-show-page/social-links';
import StudentInfo from './student-info';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoute } from '@/const/routes';

type StudentProfileProps = {
  user: User;
};

function StudentProfile({
  user,
}: StudentProfileProps): JSX.Element {
  const { pathname } = useLocation();

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <Header user={user} />

        <div className="relative">
          <ul className="flex items-center font-medium text-slate-500 overflow-scroll no-scrollbar py-4 pl-2 -ml-2 pr-7">
            <li>
              <Link
                className={classNames(
                  'flex items-center h-7 px-2 transition-all duration-150 border border-transparent min-w-max',
                  (AppRoute.Auth.Profile === pathname) &&
                  'rounded shadow bg-white border-gray-200'
                )}
                to={AppRoute.Auth.Profile}
              >
                Профиль
              </Link>
            </li>
            <li>
              <Link
                className={classNames(
                  'flex items-center h-7 px-2 transition-all duration-150 border border-transparent min-w-max',
                  (AppRoute.Auth.Lessons === pathname) &&
                  'rounded shadow bg-white border-gray-200'
                )}
                to={AppRoute.Auth.Lessons}
              >
                Расписание занятий
              </Link>
            </li>
          </ul>
          <div className="absolute top-0 right-0 z-10 min-w-6 h-full pointer-events-none bg-gradient-to-l from-gray-100 to-transparent"></div>
        </div>

        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[3fr_1fr]">
          <div className="flex flex-col gap-4 grow">
            <BaseInfo user={user} />
            <StudentInfo user={user} />
          </div>

          <div className="flex flex-col gap-4">
            <Details user={user} />
            <PhoneNumbers user={user} />
            <SocialLinks user={user} />
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default StudentProfile;
