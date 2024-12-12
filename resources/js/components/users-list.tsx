import React from 'react';
import { PropsWithClassname } from '../types';
import { Users } from '../types/users';
import Spinner from './ui/spinner';
import UsersTable from './users-table/users-table';

type UsersListProps = PropsWithClassname<{
  users: Users | null;
}>;

export default function UsersList({
  className,
  users,
}: UsersListProps): JSX.Element {
  if (!users) return <Spinner className="w-8 h-8" />;

  return <UsersTable className={className} users={users} />;
}
