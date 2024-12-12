import React from 'react';
import { AccessorProps } from '../users-table';
import { Link } from 'react-router-dom';
import { Icons } from '../../icons';
import Tooltip from '../../ui/tooltip';

export default function SocialsAccessor({
  user,
}: AccessorProps): JSX.Element {
  return (
    <ul className="flex flex-wrap gap-2">
      {user.facebook &&
        <li>
          <Link className="flex items-center justify-center p-[6px] rounded bg-white text-gray-500 shadow transition-all duration-300 hover:shadow-none" to={user.facebook}>
            <Icons.facebook width={16} height={16} />
            <Tooltip position="top" label="Фейсбук" />
          </Link>
        </li>}
      {user.instagram &&
        <li>
          <Link className="flex items-center justify-center p-[6px] rounded bg-white text-gray-500 shadow transition-all duration-300 hover:shadow-none" to={user.instagram}>
            <Icons.instagram width={16} height={16} />
            <Tooltip position="top" label="Инстаграм" />
          </Link>
        </li>}
      {user.telegram &&
        <li>
          <Link className="flex items-center justify-center p-[6px] rounded bg-white text-gray-500 shadow transition-all duration-300 hover:shadow-none" to={user.telegram}>
            <Icons.telegram width={16} height={16} />
            <Tooltip position="top" label="Телеграм" />
          </Link>
        </li>}
      {user.odnoklassniki &&
        <li>
          <Link className="flex items-center justify-center p-[6px] rounded bg-white text-gray-500 shadow transition-all duration-300 hover:shadow-none" to={user.odnoklassniki}>
            <Icons.odnoklassniki width={16} height={16} />
            <Tooltip position="top" label="Одноклассники" />
          </Link>
        </li>}
    </ul>
  );
}
