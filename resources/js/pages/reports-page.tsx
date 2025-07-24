import DescriptionList from '@/components/ui/description-list';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';

function ReportsPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const usersStatus = useAppSelector(getUsersStatus);
  const gradesStatus = useAppSelector(getGradesStatus);

  const users = useAppSelector(getUsers);
  const grades = useAppSelector(getGrades);

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
  }, [dispatch, gradesStatus, usersStatus]);

  return (
    <main className="py-2 flex flex-col gap-4">
      <h1 className="title mb-1 px-3">
        Отчеты и статистики
      </h1>

      <section className="box">
        <header className="box__header">
          <h2 className="title md:!text-lg">Базовая информация</h2>
        </header>

        <div className="relative">
          {users ? (
            <DescriptionList
              className="box__body"
              list={{
                'Ученики': users.filter(({ role }) => role === 'student').length,
                'Родители': users.filter(({ role }) => role === 'parent').length,
                'Педагоги': users.filter(({ role }) => role === 'teacher').length,
              }}
            />
          ) : (
            <Spinner className="mx-4 my-2 w-4 h-4" />
          )}
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </section>

      <section className="box">
        <header className="box__header">
          <h2 className="title md:!text-lg">Список готовых отчетов</h2>
        </header>

        <div className="relative">
          {grades ? (
            <div className="box__body">
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 max-w-[1200px]">
                {grades.map((grade) => (
                  <li key={grade.id}>
                    <Link className="text-blue-600 text-xl font-semibold" to={generatePath(AppRoute.Reports.Grade, { id: grade.id })}>
                      {grade.level} {grade.group}
                    </Link>
                  </li>
                ))}
                <li className="flex items-end">
                  <Link className="text-blue-600 text-sx font-semibold" to={AppRoute.Reports.Grades}>
                    Все классы
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Spinner className="mx-4 my-2 w-4 h-4" />
          )}
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </section>
    </main>
  );
}

export default ReportsPage;
