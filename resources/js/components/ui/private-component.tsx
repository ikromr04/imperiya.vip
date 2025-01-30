import { Role } from '@/const';
import { User } from '@/types/users';
import { ReactNode } from 'react';

type PrivateComponentProps = {
  children: ReactNode;
  user: User;
  roles: (keyof typeof Role)[];
};

function PrivateComponent({
  children,
  user,
  roles,
}: PrivateComponentProps): ReactNode {
  if (!roles.includes(user.role.id)) return null;

  return children;
}

export default PrivateComponent;
