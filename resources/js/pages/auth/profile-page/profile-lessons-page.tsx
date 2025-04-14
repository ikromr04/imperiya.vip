import AppLayout from '@/components/layouts/app-layout';
import React from 'react';
import Header from './header';
import Details from '@/pages/users/users-show-page/details';
import PhoneNumbers from '@/pages/users/users-show-page/phone-numbers';
import SocialLinks from '@/pages/users/users-show-page/social-links';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import Spinner from '@/components/ui/spinner';
import StudentLessonsTable from '@/components/lessons-table/student-lessons-table';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import classNames from 'classnames';

function ProfileLessonsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);
  const { pathname } = useLocation();

  if (!authUser) {
    return (
      <AppLayout>
        <Spinner className="w-8 h-8" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <Header user={authUser} />

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

        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[75%_1fr]">
          <div className="flex flex-col gap-4 grow">
            <StudentLessonsTable />
          </div>

          <div className="flex flex-col gap-4">
            <Details user={authUser} />
            <PhoneNumbers user={authUser} />
            <SocialLinks user={authUser} />
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default ProfileLessonsPage;
