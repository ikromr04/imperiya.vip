import React, { ComponentType, Suspense, lazy } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const SuperadminProfile = lazy(() => import('./superadmin-profile/superadmin-profile'));
const AdminProfile = lazy(() => import('./admin-profile/admin-profile'));
const DirectorProfile = lazy(() => import('./director-profile/director-profile'));
const TeacherProfile = lazy(() => import('./teacher-profile/teacher-profile'));
const ParentProfile = lazy(() => import('./parent-profile/parent-profile'));
const StudentProfile = lazy(() => import('./student-profile/student-profile'));

const rolePage: Record<Role, ComponentType> = {
  superadmin: SuperadminProfile,
  admin: AdminProfile,
  director: DirectorProfile,
  teacher: TeacherProfile,
  parent: ParentProfile,
  student: StudentProfile,
};

function ProfilePage(): JSX.Element {
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

export default ProfilePage;
