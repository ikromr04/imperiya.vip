import React, { BaseSyntheticEvent } from 'react';
import { Icons } from '../icons';
import { PropsWithClassname } from '../../types';
import { User } from '../../types/users';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Tooltip from './tooltip';

type UserCardProps = PropsWithClassname<{
  user: User;
}>;

export default function UserCard({
  className,
  user,
}: UserCardProps): JSX.Element {
  return (
    <article className={classNames(
      className,
      'flex flex-col bg-white shadow rounded',
    )}>
      <header className="flex gap-2 p-2">
        <div className="relative z-0 flex w-16 h-16 min-w-16 rounded-full bg-gray-100">
          <img
            className="absolute z-10 top-0 left-0 w-full h-full object-cover"
            src={user.avatarThumb || 'undefined'}
            width={200}
            height={200}
            alt={user.name}
            onError={(evt: BaseSyntheticEvent) => evt.target.remove()}
          />
          <Icons.user className="text-gray-300" width={64} height={64} />
        </div>

        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-900 leading-[1.2]">{user.name}</h2>
          <div>{user.role.name}</div>
        </div>
      </header>

      <dl>
        <div>
          <dt>Дата рождения</dt>
          <dd>{user.birthDate}</dd>
        </div>
        <div>
          <dt>Адрес</dt>
          <dd>{user.address}</dd>
        </div>
      </dl>

      <footer className="flex items-center border-t px-2 py-2 gap-1">
        {user.email &&
          <Link className="flex z-10 py-1 px-2 rounded-sm transition-all duration-300 bg-gray-50 text-success hover:bg-blue-50" to={`mailto:${user.email}`}>
            <Icons.mail width={16} height={16} />
            <Tooltip label="Отправить почту" position="right" />
          </Link>}
        {user.phones?.[0] &&
          <Link className="flex py-1 px-2 rounded-sm transition-all duration-300 bg-gray-50 text-success hover:bg-blue-50" to={`tel:${user.phones[0]}`}>
            <Icons.call width={16} height={16} />
            <Tooltip label="Позвонить" position="right" />
          </Link>}
        <div>{user.login}</div>

        {user.gender &&
          <div className={classNames(
            'flex items-center justify-center w-8 h-8 rounded ml-auto',
            user.gender.id === 1 ? 'bg-blue-100' : 'bg-pink-100',
          )}>
            {user.gender.id === 1
              ? <Icons.male className="text-blue-600" width={16} height={16} />
              : <Icons.female className="text-pink-600" width={16} height={16} />}
            <Tooltip label={user.gender?.name} position="top" />
          </div>}
      </footer>
    </article>
  );
}
