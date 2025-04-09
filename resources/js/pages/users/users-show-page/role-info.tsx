import DescriptionList from '@/components/ui/description-list';
import { AppRoute } from '@/const/routes';
import { RoleName } from '@/const/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import { getProfessions } from '@/store/professions-slice/professions-selector';
import { User, Users } from '@/types/users';
import dayjs from 'dayjs';
import React, { Fragment, ReactNode, useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';

type RoleInfoProps = {
  users: Users;
  user: User;
};

function RoleInfo({
  users,
  user,
}: RoleInfoProps): JSX.Element {
  let list: { [term: string]: ReactNode; } = {};
  const grades = useAppSelector(getGrades);
  const dispatch = useAppDispatch();
  const professions = useAppSelector(getProfessions);
  const grade = grades.data?.find(({ id }) => id === user.student?.gradeId);
  const mother = users.find(({ id }) => id === user.student?.motherId);
  const father = users.find(({ id }) => id === user.student?.fatherId);
  const children = users.filter(({ id }) => user.parent?.children?.includes(id));

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!professions.data && !professions.isFetching) dispatch(fetchProfessionsAction());
  }, [dispatch, grades.data, grades.isFetching, professions.data, professions.isFetching]);

  switch (user.role) {
    // case user.superadmin !== undefined:
    //   break;
    // case user.admin !== undefined:
    //   break;
    // case user.director !== undefined:
    //   break;
    // case 'teacher':

    //   break;
    case 'student':
      list = {
        'Класс': grade ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Classes.Show, { id: grade.id })}>
            {grade.level} {grade.group}
          </Link> : '-',
        'Мать': mother ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: mother.id })}>
            {mother.name} {mother.surname}
          </Link> : '-',
        'Отец': father ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: father.id })}>
            {father.name} {father.surname}
          </Link> : '-',
        'С какого года ребенок обучается в ЧОУ «Империя знаний» :':
          user.student?.admissionDate ? dayjs(user.student.admissionDate).format('DD MMMM YYYY') : '-',
        'Предыдущие школы': user.student?.previousSchools ?? '-',
        'Медицинские и психологические рекомендации :': user.student?.medicalRecommendations ?? '-',
      };
      break;
    case 'parent':
      list = {
        'Дети': children ? children.map((child) => (
          <Fragment key={child.id}>
            <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: child.id })}>
              {child.name} {child.surname}
            </Link>
            <br />
          </Fragment>
        )) : '-',
        'Сфера деятельности': professions.data?.find(({id}) => user.parent?.professionId === id)?.name ?? '-',
        'Место работы': user.parent?.workplace ?? '-',
        'Должность': user.parent?.position ?? '-',
      };
      break;
  }

  return (
    <section className="box">
      <header className="box__header">
        <h2 className="title !text-lg">{RoleName[user.role]}</h2>
      </header>

      <div className="relative">
        <DescriptionList
          className="box__body"
          list={list}
        />
        <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
}

export default RoleInfo;
