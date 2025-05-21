import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsersStatus } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import Header from './header/header';
import { AsyncStatus } from '@/const/store';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getNationalitiesStatus } from '@/store/nationalities-slice/nationalities-selector';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import { getProfessionsStatus } from '@/store/professions-slice/professions-selector';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import { getGradesStatus } from '@/store/grades-slice/grades-selector';
import Navigation from './navigation';
import BaseInfo from './base-info/base-info';
import Details from './details';
import PhoneNumbers from './phone-numbers';
import SocialLinks from './socials-links';
import DescriptionList from '@/components/ui/description-list';
import { RoleName } from '@/const/users';

function SuperadminProfile(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthUser);
  const usersStatus = useAppSelector(getUsersStatus);
  const gradesStatus = useAppSelector(getGradesStatus);
  const nationalitiesStatus = useAppSelector(getNationalitiesStatus);
  const professionsStatus = useAppSelector(getProfessionsStatus);

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (nationalitiesStatus === AsyncStatus.Idle) dispatch(fetchNationalitiesAction());
    if (professionsStatus === AsyncStatus.Idle) dispatch(fetchProfessionsAction());
  }, [dispatch, gradesStatus, nationalitiesStatus, professionsStatus, usersStatus]);

  if (!user) return <Spinner className="w-8 h-8 m-2" />;

  return (
    <main className="pt-4 pb-40">
      <Header />

      <Navigation />

      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-4 grow">
          <BaseInfo />

          <section className="box">
            <header className="box__header">
              <h2 className="title md:!text-lg">{RoleName[user.role]}</h2>
            </header>

            <div className="relative">
              <DescriptionList
                className="box__body"
                list={{}}
              />
              <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <Details />
          <PhoneNumbers />
          <SocialLinks />
        </div>
      </div>
    </main >
  );
}

export default SuperadminProfile;
