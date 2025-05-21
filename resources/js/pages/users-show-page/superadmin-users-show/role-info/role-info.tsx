import Spinner from '@/components/ui/spinner';
import { Role, User } from '@/types/users';
import React, { ComponentType, lazy, Suspense } from 'react';

const SuperadminInfo = lazy(() => import('./superadmin-info'));
const AdminInfo = lazy(() => import('./admin-info'));
const DirectorInfo = lazy(() => import('./director-info'));
const TeacherInfo = lazy(() => import('./teacher-info'));
const ParentInfo = lazy(() => import('./parent-info'));
const StudentInfo = lazy(() => import('./student-info'));

type InfoComponent = ComponentType<{ user: User }>;

const role: Record<Role, InfoComponent> = {
  superadmin: SuperadminInfo,
  admin: AdminInfo,
  director: DirectorInfo,
  teacher: TeacherInfo,
  parent: ParentInfo,
  student: StudentInfo,
};

type RoleInfoProps = {
  user: User;
};

function RoleInfo({
  user,
}: RoleInfoProps): JSX.Element {
  const Component = role[user.role];

  return (
    <Suspense fallback={<Spinner className="w-10 h-10" />}>
      <Component user={user} />
    </Suspense>
  );
}

export default RoleInfo;
