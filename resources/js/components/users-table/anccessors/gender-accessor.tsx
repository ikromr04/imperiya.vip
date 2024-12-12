import React, { ReactNode } from 'react';
import { Icons } from '../../icons';
import { AccessorProps } from '../users-table';
import Tooltip from '../../ui/tooltip';
import classNames from 'classnames';

export default function GenderAccessor({
  user,
}: AccessorProps): ReactNode {
  if (!user.gender) return null;
  return (
    <div className={classNames(
      'flex items-center justify-center w-8 h-8 rounded mx-auto',
      user.gender.id === 1 ? 'bg-blue-100' : 'bg-pink-100',
    )}>
      {user.gender.id === 1
        ? <Icons.male className="text-blue-600" width={16} height={16} />
        : <Icons.female className="text-pink-600" width={16} height={16} />}
      <Tooltip label={user.gender?.name} position="top" />
    </div>
  );
}
