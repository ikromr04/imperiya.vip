import AppLayout from '@/components/layouts/app-layout';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import Spinner from '@/components/ui/spinner';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { RoleName, SexName } from '@/const/users';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getNationalities } from '@/store/nationalities-slice/nationalities-selector';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import DescriptionList from '@/components/ui/description-list';
import dayjs from 'dayjs';
import { getStudent } from '@/store/users-slice/users-selector';
import { fetchStudentAction } from '@/store/users-slice/users-api-actions';
import Layout from './layout';

function StudentProfile(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthUser);
  const grades = useAppSelector(getGrades);
  const nationalities = useAppSelector(getNationalities);
  const student = useAppSelector(getStudent);

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!nationalities.data && !nationalities.isFetching) dispatch(fetchNationalitiesAction());
    if (!student.data && !student.isFetching) dispatch(fetchStudentAction());
  }, [dispatch, grades.data, grades.isFetching, nationalities.data, nationalities.isFetching, student.data, student.isFetching]);

  if (!user) {
    return (
      <AppLayout>
        <Spinner className="w-8 h-8 m-2" />
      </AppLayout>
    );
  }

  return (
    <Layout>
      <section className="box">
        <header className="box__header">
          <h2 className="title !text-lg">Базовая информация</h2>
        </header>

        <div className="relative">
          <DescriptionList
            className="box__body"
            list={{
              'Фамилия': user.surname,
              'Имя': user.name,
              'Отчество': user.patronymic ?? '-',
              'Логин': user.login,
              'Позиция': RoleName[user.role],
              'Пол': SexName[user.sex],
              'Электронная почта':
                user.email ? (
                  <a className="text-blue-600" href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                ) : '-',
              'Дата рождения': user.birthDate ? dayjs(user.birthDate).format('DD MMMM YYYY') : '-',
              'Адрес': user.address ?
                `${(user.address.region !== 'За пределами города') ? 'район ' : ''}${user.address.region}, ${user.address.physicalAddress}`
                : '-',
              'Национальность': nationalities.data?.find(({ id }) => id === user.nationalityId)?.name || '-',
              'WhatsApp': (user.whatsapp?.code && user.whatsapp?.numbers) ? (
                <a
                  className="text-blue-600"
                  href={`https://wa.me/+${user.whatsapp.code}${user.whatsapp.numbers}`}
                  target="_blank"
                >
                  +{user.whatsapp.code} {user.whatsapp.numbers}
                </a>
              ) : '-',
            }}
          />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>

      <section className="box">
        <header className="box__header">
          <h2 className="title !text-lg">{RoleName[user.role]}</h2>
        </header>

        <div className="relative">
          <DescriptionList
            className="box__body"
            list={{
              'Класс': `${student.data?.grade.level} ${student.data?.grade.group}`,
              'Мать': student.data?.mother ? `${student.data.mother.surname} ${student.data.mother.name}` : '-',
              'Отец': student.data?.father ? `${student.data.father.surname} ${student.data.father.name}` : '-',
            }}
          />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>
    </Layout>
  );
}

export default StudentProfile;
