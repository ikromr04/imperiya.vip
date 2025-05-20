import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchRatingDatesAction } from '@/store/ratings-slice/ratings-api-actions';
import { getRatingDatesStatus } from '@/store/ratings-slice/ratings-selector';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import { getSubjectsStatus } from '@/store/subjects-slice/subjects-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsersStatus } from '@/store/users-slice/users-selector';
import React, { useEffect } from 'react';
import Journal from './journal/journal';
import Header from './header/header';

function SuperadminJournal(): JSX.Element {
  const dispatch = useAppDispatch();
  const gradesStatus = useAppSelector(getGradesStatus);
  const subjectsStatus = useAppSelector(getSubjectsStatus);
  const usersStatus = useAppSelector(getUsersStatus);
  const ratingDatesStatus = useAppSelector(getRatingDatesStatus);

  useEffect(() => {
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (subjectsStatus === AsyncStatus.Idle) dispatch(fetchSubjectsAction());
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (ratingDatesStatus === AsyncStatus.Idle) dispatch(fetchRatingDatesAction());
  }, [dispatch, gradesStatus, ratingDatesStatus, subjectsStatus, usersStatus]);

  return (
    <main className="flex flex-col gap-y-1 py-2">
      <Header />

      <Journal />

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
