import { Role } from '@/const';
import { User } from '@/types/users';
import { ReactNode } from 'react';

type RoleType = typeof Role[keyof typeof Role];

type PrivateComponentProps = {
  children: ReactNode;
  user: User;
  roles: RoleType[];
};

function PrivateComponent({
  children,
  user,
  roles,
}: PrivateComponentProps): ReactNode {
  if (!roles.includes(user.role.slug)) return null;

  return children;
}

export default PrivateComponent;
