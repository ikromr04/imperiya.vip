import { Role, User } from '@/types/users';
import { ReactNode } from 'react';

type PrivateComponentProps = {
  children: ReactNode;
  user: User;
  roles: Role[];
};

function PrivateComponent({
  children,
  user,
  roles,
}: PrivateComponentProps): ReactNode {
  if (!roles.includes(user.role)) return null;

  return children;
}

export default PrivateComponent;
