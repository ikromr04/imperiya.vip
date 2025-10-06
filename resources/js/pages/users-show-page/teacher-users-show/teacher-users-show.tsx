import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import { RoleName, SexName } from '@/const/users';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { getNationalities, getNationalitiesStatus } from '@/store/nationalities-slice/nationalities-selector';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import DescriptionList from '@/components/ui/description-list';
import dayjs from 'dayjs';
import Layout from './layout';
import { AsyncStatus } from '@/const/store';
import { AppRoute } from '@/const/routes';

function TeacherUsersShow(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(getUsersStatus);
  const gradesStatus = useAppSelector(getGradesStatus);
  const nationalitiesStatus = useAppSelector(getNationalitiesStatus);

  const users = useAppSelector(getUsers);
  const grades = useAppSelector(getGrades);
  const nationalities = useAppSelector(getNationalities);

  const user = users?.find((user) => user.id === +(params.id || 0)) || null;
  const grade = grades?.find(({ id }) => id === user?.student?.gradeId);
  const teacherGrades = grades?.filter((grade) => grade.teacherId === user?.id);

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (nationalitiesStatus === AsyncStatus.Idle) dispatch(fetchNationalitiesAction());
  }, [dispatch, gradesStatus, nationalitiesStatus, usersStatus]);

  if (!user || !users) {
    return <Spinner className="w-8 h-8 m-2" />;
  }

  return (
    <Layout withSidebar>
      <section className="box">
        <div className="box__header">
          <h2 className="title !text-lg">Базовая информация</h2>
        </div>

        <div className="relative">
          <DescriptionList
            className="box__body"
            list={{
              'Фамилия': user.surname,
              'Имя': user.name,
              'Отчество': user.patronymic ?? '-',
              'Позиция': RoleName[user.role],
              'Пол': SexName[user.sex],
              'Электронная почта':
                user.email ? (
                  <Link className="text-blue-600" to={`mailto:${user.email}`}>
                    {user.email}
                  </Link>
                ) : '-',
              'Дата рождения': user.birthDate ? dayjs(user.birthDate).format('DD MMMM YYYY') : '-',
              'Адрес': user.address ?
                `${(user.address.region !== 'За пределами города') ? 'район ' : ''}${user.address.region}, ${user.address.physicalAddress}`
                : '-',
              'Национальность': nationalities?.find(({ id }) => id === user.nationalityId)?.name || '-',
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
          {user.role === 'teacher' && (
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
          )}
          {user.role === 'student' && (
            <DescriptionList
              className="box__body"
              list={{
                'Класс': grade ? (
                  <Link
                    key={grade.id}
                    className="text-blue-600"
                    to={generatePath(AppRoute.Classes.Show, { id: grade.id })}
                  >
                    {grade.level} {grade.group}
                  </Link>
                ) : '-',
              }}
            />
          )}
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>
    </Layout>
  );
}

export default TeacherUsersShow;
