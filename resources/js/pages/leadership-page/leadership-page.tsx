import React, { ComponentType, Suspense, lazy } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role, UserId } from '@/types/users';
import Spinner from '@/components/ui/spinner';
import { GradeId } from '@/types/grades';
import { MarkId } from '@/types/marks';

const SuperadminLeadership= lazy(() => import('./superadmin-leadership'));
const AdminLeadership= lazy(() => import('./admin-leadership'));
const DirectorLeadership= lazy(() => import('./director-leadership'));
const StudentLeadership= lazy(() => import('./student-leadership'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

export type Data = {
  users: {
    id: UserId;
    name: string;
    surname: string;
    patronymic: string;
    avatarThumb: string;
    student: { gradeId: GradeId; };
  }[];
  marks: {
    id: MarkId;
    studentId: UserId;
    score1: number;
    score2: number;
  }[];
  grades: {
    id: GradeId;
    level: number;
    group: string;
  }[];
};

const rolePage: Record<Role, ComponentType> = {
  superadmin: SuperadminLeadership,
  admin: AdminLeadership,
  director: DirectorLeadership,
  teacher: NotFoundPage,
  parent: NotFoundPage,
  student: StudentLeadership,
};

function LeadershipPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  const Component = rolePage[authUser.role];

  return (
    <Suspense fallback={<Spinner className="w-10 h-10" />}>
      <Component />
    </Suspense>
  );
}

export default LeadershipPage;
