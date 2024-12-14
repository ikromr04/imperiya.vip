import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Icons } from './icons';
import Tooltip from './ui/tooltip';
import { PropsWithClassname } from '../types';
import classNames from 'classnames';

const Social = {
  facebook: 'Фейсбук',
  instagram: 'Инстаграм',
  telegram: 'Телеграм',
  odnoklassniki: 'Одноклассники',
};

type SocialLinkProps = PropsWithClassname<LinkProps & {
  name: keyof typeof Social;
}>;

export default function SocialLink({
  className,
  name,
  ...props
}: SocialLinkProps): JSX.Element {
  const Icon = Icons[name];

  return (
    <Link
      {...props}
      className={classNames(
        className,
        'flex items-center justify-center p-[6px] rounded bg-white text-gray-500 shadow transition-all duration-300 hover:shadow-none',
      )}
    >
      <Icon width={16} height={16} />
      <Tooltip position="top" label={Social[name]} />
    </Link>
  );
}
