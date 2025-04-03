import JournalTable from '@/components/journal-table/journal-table';
import AppLayout from '@/components/layouts/app-layout';
import SelectField from '@/components/ui/formik-controls/select-field';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import { getLessons } from '@/store/lessons-slice/lessons-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

function JournalPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const lessons = useAppSelector(getLessons);
  const [gradeId, setGradeId] = useState(0);
  const [lessonId, setLessonId] = useState(0);

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!lessons.data && !lessons.isFetching) dispatch(fetchLessonsAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
  }, [dispatch, grades.data, grades.isFetching, lessons.data, lessons.isFetching, users.data, users.isFetching]);

  const onSubmit = async (
    values: { gradeId: number; lessonId: number; },
  ) => {
    setGradeId(+values.gradeId);
    setLessonId(+values.lessonId);
  };

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <header className="relative z-40 flex flex-wrap gap-x-4 gap-y-1 px-3 items-end mb-1">
          <h1 className="title">Журнал</h1>

          <Formik
            initialValues={{ gradeId, lessonId }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <Form className="flex gap-1">
                {grades.data && (
                  <SelectField
                    inputClassname="!bg-white"
                    placeholder="Класс"
                    options={grades.data.map((grade) => ({ value: grade.id.toString(), label: `${grade.level} ${grade.group}` }))}
                    name="gradeId"
                    onChange={() => handleSubmit()}
                  />
                )}
                {lessons.data && (
                  <SelectField
                    inputClassname="!bg-white"
                    placeholder="Урок"
                    options={lessons.data.map((lesson) => ({ value: lesson.id.toString(), label: lesson.name }))}
                    name="lessonId"
                    onChange={() => handleSubmit()}
                    searchable
                  />
                )}
              </Form>
            )}
          </Formik>
        </header>

        {(gradeId > 0 && lessonId > 0) && users.data && grades.data && lessons.data && (
          <JournalTable
            key={`${lessonId.toString()}${gradeId.toString()}`}
            students={users.data.filter((user) => user.student?.gradeId === gradeId)}
            lessonId={lessonId}
            gradeId={gradeId}
          />
        )}
      </main>
    </AppLayout>
  );
}

export default JournalPage;
