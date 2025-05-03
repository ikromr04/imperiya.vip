import JournalTable from '@/components/journal-table/journal-table';
import SelectField from '@/components/ui/formik-controls/select-field';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchRatingDatesAction } from '@/store/ratings-slice/ratings-api-actions';
import { getRatingDates, getRatingDatesStatus } from '@/store/ratings-slice/ratings-selector';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import { getSubjects, getSubjectsStatus } from '@/store/subjects-slice/subjects-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { GradeId } from '@/types/grades';
import { SubjectId } from '@/types/subjects';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function SuperadminJournal(): JSX.Element {
  const dispatch = useAppDispatch();
  const gradesStatus = useAppSelector(getGradesStatus);
  const usersStatus = useAppSelector(getUsersStatus);
  const subjectsStatus = useAppSelector(getSubjectsStatus);
  const ratingDatesStatus = useAppSelector(getRatingDatesStatus);
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const subjects = useAppSelector(getSubjects);
  const ratingDates = useAppSelector(getRatingDates);
  const [searchParams, setSearchParams] = useSearchParams();
  const gradeId = searchParams.get('gradeId');
  const subjectId = searchParams.get('subjectId');
  const currentRatingDate = ratingDates?.find(({ years }) => years === '2024-2025');

  useEffect(() => {
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (subjectsStatus === AsyncStatus.Idle) dispatch(fetchSubjectsAction());
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (ratingDatesStatus === AsyncStatus.Idle) dispatch(fetchRatingDatesAction());
  }, [dispatch, gradesStatus, ratingDatesStatus, subjectsStatus, usersStatus]);

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
    <main className="pt-4 pb-40">
      <header className="relative z-50 flex flex-wrap gap-x-4 gap-y-1 px-3 items-end mb-1">
        <h1 className="title">Журнал</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form className="flex gap-1">
              {grades && (
                <SelectField
                  className="min-w-16"
                  inputClassname="!bg-white"
                  placeholder="Класс"
                  options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
                  name="gradeId"
                  onChange={() => handleSubmit()}
                />
              )}
              {subjects && (
                <SelectField
                  className="min-w-[200px]"
                  inputClassname="!bg-white"
                  placeholder="Предмет"
                  options={subjects.map((subject) => ({ value: subject.id, label: subject.name }))}
                  name="subjectId"
                  onChange={() => handleSubmit()}
                  searchable
                />
              )}
            </Form>
          )}
        </Formik>
      </header>

      {/* {(gradeId && +gradeId > 0 && subjectId && +subjectId > 0) && users && grades && subjects && (
        <JournalTable
          key={`${subjectId.toString()}${gradeId.toString()}`}
          students={users.filter((user) => user.student?.gradeId === +gradeId)}
          subjectId={+subjectId}
          gradeId={+gradeId}
          ratingDate={currentRatingDate}
        />
      )} */}
    </main>
  );
}

export default SuperadminJournal;
