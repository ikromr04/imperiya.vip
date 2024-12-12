import React, { BaseSyntheticEvent } from 'react';
import { Icons } from '../../icons';
import { AccessorProps } from '../users-table';
import { AppRoute } from '../../../const';
import Button from '../../ui/button';

export default function NameAccessor({
  user,
}: AccessorProps): JSX.Element {
  return (
    <Button className="min-h-max !px-0" href={AppRoute.Users.Index} variant="text">
      <span className="relative z-0 flex min-w-12 min-h-12 rounded-full bg-gray-100 overflow-hidden">
        <img
          className="absolute z-10 top-0 left-0 w-full h-full object-cover"
          src={user.avatar || 'undefined'}
          width={200}
          height={200}
          alt={user.name}
          onError={(evt: BaseSyntheticEvent) => evt.target.remove()}
        />
        <Icons.user className="text-gray-300" width={48} height={48} />
      </span>
      <p className="leading-[1.2]">{user.name}</p>
    </Button>
  );
}
