import React, { useEffect } from 'react';
import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { getSubjects } from '@/store/subjects-slice/subjects-selector';
import AppLayout from '@/components/layouts/app-layout';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import LessonsTable from '@/components/lessons-table/lessons-table';

function LessonsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const grades = useAppSelector(getGrades);
  const subjects = useAppSelector(getSubjects);
  const users = useAppSelector(getUsers);

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
    if (!subjects.data && !subjects.isFetching) dispatch(fetchSubjectsAction());
  }, [dispatch, grades.data, grades.isFetching, subjects.data, subjects.isFetching, users.data, users.isFetching]);

  return (
    <AppLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Расписание занятий
        </h1>

        {(grades.data && subjects.data && users.data) ? (
          <LessonsTable
            grades={grades.data}
            subjects={subjects.data}
            users={users.data}
          />
        ) : (
          <Spinner className="w-8 h-8" />
        )}
      </main>
    </AppLayout >
  );
}

export default LessonsPage;
