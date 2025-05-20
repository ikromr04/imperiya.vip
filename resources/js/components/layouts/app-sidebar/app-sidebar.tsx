import React, { ComponentType, Suspense, lazy } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import Spinner from '@/components/ui/spinner';
import { Role } from '@/types/users';

const SuperadminSidebar = lazy(() => import('./superadmin-sidebar'));
const StudentSidebar = lazy(() => import('./student-sidebar'));
const ParentSidebar = lazy(() => import('./parent-sidebar'));
const TeacherSidebar = lazy(() => import('./teacher-sidebar'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const sidebars: Record<Role, ComponentType> = {
  superadmin: SuperadminSidebar,
  admin: NotFoundPage,
  director: NotFoundPage,
  teacher: TeacherSidebar,
  parent: ParentSidebar,
  student: StudentSidebar,
};

function AppSidebar(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);
  const Component = sidebars[authUser?.role as Role] ?? NotFoundPage;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center p-4">
          <Spinner className="w-6 h-6" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

export default AppSidebar;
