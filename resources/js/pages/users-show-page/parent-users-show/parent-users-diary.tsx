import React, { useEffect } from 'react';
import ParentDiaryTable from '@/components/diary-table/parent-diary-table';
import Layout from './layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useParams } from 'react-router-dom';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { AsyncStatus } from '@/const/store';

function ParentUsersDiary(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(getUsersStatus);
  const gradesStatus = useAppSelector(getGradesStatus);

  const users = useAppSelector(getUsers);
  const grades = useAppSelector(getGrades);

  const user = users?.find((user) => user.id === +(params.id || 0)) || null;
  const grade = grades?.find(({ id }) => id === user?.student?.gradeId);

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
  }, [dispatch, gradesStatus, usersStatus]);

  return (
    <Layout>
      {grade && user && <ParentDiaryTable grade={grade} studentId={user?.id} />}
    </Layout>
  );
}

export default ParentUsersDiary;
