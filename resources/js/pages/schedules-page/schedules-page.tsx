import React, { useEffect } from 'react';
import PageLayout from '@/components/layouts/app-layout';
import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { getLessons } from '@/store/lessons-slice/lessons-selector';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import SchedulesTable from '@/components/schedules-table/schedules-table';

function SchedulesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const grades = useAppSelector(getGrades);
  const lessons = useAppSelector(getLessons);
  const users = useAppSelector(getUsers);

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
    if (!lessons.data && !lessons.isFetching) dispatch(fetchLessonsAction());
  }, [
    dispatch,
    grades.data,
    grades.isFetching,
    lessons.data,
    lessons.isFetching,
    users.data,
    users.isFetching,
  ]);

  return (
    <PageLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Расписание занятий
        </h1>

        {(grades.data && lessons.data && users.data) ? (
          <SchedulesTable
            grades={grades.data}
            lessons={lessons.data}
            users={users.data}
          />
        ) : (
          <Spinner className="w-8 h-8" />
        )}
      </main>
    </PageLayout >
  );
}

export default SchedulesPage;
