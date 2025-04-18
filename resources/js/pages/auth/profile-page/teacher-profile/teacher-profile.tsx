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
import Layout from './layout';
import CopyButton from '@/components/ui/copy-button';

function TeacherProfile(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthUser);
  const grades = useAppSelector(getGrades);
  const nationalities = useAppSelector(getNationalities);
  const teacherGrades = grades.data?.filter((grade) => grade.teacherId === user?.id);
  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!nationalities.data && !nationalities.isFetching) dispatch(fetchNationalitiesAction());
  }, [dispatch, grades.data, grades.isFetching, nationalities.data, nationalities.isFetching]);

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
              'Пароль': user.password ? (
                <CopyButton className="items-baseline font-normal text-[16px] h-auto !p-0 shadow-none" string={user.password} >
                  Скопировать
                </CopyButton>
              ) : '',
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
              'Руководитель классов': (teacherGrades && teacherGrades.length) ? (
                <div className="flex flex-wrap gap-2">
                  {teacherGrades?.map((grade) => (
                    `${grade.level} ${grade.group}`
                  ))}
                </div>
              ) : '-',
            }}
          />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>
    </Layout>
  );
}

export default TeacherProfile;
