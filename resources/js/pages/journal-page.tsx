import JournalTable from '@/components/journal-table/journal-table';
import AppLayout from '@/components/layouts/app-layout';
import SelectField from '@/components/ui/formik-controls/select-field';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import { getSubjects } from '@/store/subjects-slice/subjects-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { GradeId } from '@/types/grades';
import { SubjectId } from '@/types/subjects';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function JournalPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const subjects = useAppSelector(getSubjects);
  const [searchParams, setSearchParams] = useSearchParams();
  const gradeId = searchParams.get('gradeId');
  const subjectId = searchParams.get('subjectId');

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!subjects.data && !subjects.isFetching) dispatch(fetchSubjectsAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
  }, [dispatch, grades.data, grades.isFetching, subjects.data, subjects.isFetching, users.data, users.isFetching]);

  const onSubmit = async (
    values: {
      gradeId: GradeId;
      subjectId: SubjectId;
    },
  ) => {
    if (values.gradeId) {
      setSearchParams({
        subjectId: values.subjectId.toString(),
        gradeId: values.gradeId.toString(),
      });
    }
  };

  const initialValues = {
    gradeId: !isNaN(Number(gradeId)) ? Number(gradeId) : 0,
    subjectId: !isNaN(Number(subjectId)) ? Number(subjectId) : 0,
  };

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <header className="relative z-40 flex flex-wrap gap-x-4 gap-y-1 px-3 items-end mb-1">
          <h1 className="title">Журнал</h1>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <Form className="flex gap-1">
                {grades.data && (
                  <SelectField
                    inputClassname="!bg-white"
                    placeholder="Класс"
                    options={grades.data.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
                    name="gradeId"
                    onChange={() => handleSubmit()}
                  />
                )}
                {subjects.data && (
                  <SelectField
                    inputClassname="!bg-white"
                    placeholder="Предмет"
                    options={subjects.data.map((subject) => ({ value: subject.id, label: subject.name }))}
                    name="subjectId"
                    onChange={() => handleSubmit()}
                    searchable
                  />
                )}
              </Form>
            )}
          </Formik>
        </header>

        {(gradeId && +gradeId > 0 && subjectId && +subjectId > 0) && users.data && grades.data && subjects.data && (
          <JournalTable
            key={`${subjectId.toString()}${gradeId.toString()}`}
            students={users.data.filter((user) => user.student?.gradeId === +gradeId)}
            subjectId={+subjectId}
            gradeId={+gradeId}
          />
        )}
      </main>
    </AppLayout>
  );
}

export default JournalPage;
