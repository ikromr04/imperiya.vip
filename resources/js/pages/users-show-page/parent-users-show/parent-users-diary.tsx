import React, { useEffect } from 'react';
import ParentDiaryTable from '@/components/diary-table/parent-diary-table';
import Layout from './layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useParams } from 'react-router-dom';
import { getUsers } from '@/store/users-slice/users-selector';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';

function ParentUsersDiary(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const users = useAppSelector(getUsers);
  const user = users.data?.find((user) => user.id === +(params.id || 0)) || null;
  const grades = useAppSelector(getGrades);
  const grade = grades.data?.find(({ id }) => id === user?.student?.gradeId);

  useEffect(() => {
    if (!user && params.id && !users.isFetching) dispatch(fetchUsersAction());
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
  }, [user, params.id, dispatch, users.isFetching, grades.data, grades.isFetching]);

  return (
    <Layout>
      {grade && user && <ParentDiaryTable grade={grade} studentId={user?.id} />}
    </Layout>
  );
}

export default ParentUsersDiary;
