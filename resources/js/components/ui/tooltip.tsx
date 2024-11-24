import classNames from 'classnames';
import React from 'react';
import { Icons } from '../icons';

export default function Tooltip({
  label,
  position = 'top',
}: {
  label: string;
  position?: 'top' | 'right' | 'bottom' | 'left'
}): JSX.Element {
  return (
    <span className={classNames(
      'absolute transform bg-gray-900 text-white pointer-events-none text-sm px-[6px] transition-all duration-300 rounded invisible opacity-0 group-hover:opacity-100 group-hover:visible',
      position === 'top' && 'bottom-full left-1/2 -translate-x-1/2 -translate-y-[5px]',
      position === 'right' && 'left-full top-1/2 -translate-y-1/2 translate-x-[5px]',
    )}>
      {label}
      <Icons.caretDown
        className={classNames(
          'absolute transform text-gray-900',
          position === 'top' && 'top-full left-1/2 -translate-x-1/2 -translate-y-[2px]',
          position === 'right' && 'right-full top-1/2 rotate-90 translate-x-[4px] -translate-y-1/2',
        )}
        width={10}
      />
    </span>
  );
}
