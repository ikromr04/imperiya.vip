import React, { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { AsyncStatus } from '@/const/store';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import StudentRatingsTable from '@/components/ratings-table/student-ratings-table/student-ratings-table';
import Layout from './layout';

function ParentUsersRatings(): ReactNode {
  const params = useParams();
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(getUsersStatus);

  const users = useAppSelector(getUsers);
  const user = users?.find((user) => user.id === +(params.id || 0)) || null;

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
  }, [dispatch, usersStatus]);

  if (!user || !users) return null;

  return (
    <Layout>
      <StudentRatingsTable user={user} />
    </Layout>
  );
}

export default ParentUsersRatings;
