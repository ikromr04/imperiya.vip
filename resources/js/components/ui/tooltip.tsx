import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Icons } from '../icons';
import { PropsWithClassname } from '../../types';

type TooltipProps = PropsWithClassname<{
  label: string;
  position?: 'top' | 'right' | 'bottom' | 'left'
}>;

export default function Tooltip({
  className,
  label,
  position = 'top',
}: TooltipProps): JSX.Element {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    ref.current?.parentElement?.classList.add('relative', 'group');
  }, [ref]);

  return (
    <span ref={ref} className={classNames(
      className,
      'absolute transform w-max bg-gray-900 leading-none font-light text-white pointer-events-none text-sm py-1 px-2 transition-all duration-300 rounded invisible opacity-0 group-hover:opacity-100 group-hover:visible hidden md:flex',
      position === 'top' && 'bottom-full left-1/2 -translate-x-1/2 -translate-y-[5px]',
      position === 'right' && 'left-full top-1/2 -translate-y-1/2 translate-x-[5px]',
      position === 'bottom' && 'left-1/2 top-full -translate-x-1/2 translate-y-[5px]',
      position === 'left' && 'right-full top-1/2 -translate-y-1/2 -translate-x-[5px]',
    )}>
      {label}
      <Icons.caretDown
        className={classNames(
          'absolute transform text-gray-900',
          position === 'top' && 'top-full left-1/2 -translate-x-1/2',
          position === 'right' && 'right-full top-1/2 rotate-90 translate-x-[3px] -translate-y-1/2',
          position === 'bottom' && 'right-1/2 bottom-full rotate-180 translate-x-[4px]',
          position === 'left' && 'left-full top-1/2 -rotate-90 -translate-x-[3px] -translate-y-1/2',
        )}
        width={10}
      />
    </span>
  );
}
