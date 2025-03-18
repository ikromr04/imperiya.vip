import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Icons } from '@/components/icons';

type CleanableProps = {
  className?: string;
  onClean?: (value: string) => void;
};

function Cleanable({
  className,
  onClean,
}: CleanableProps): ReactNode {
  return (
    <button
      className={classNames(
        className,
        'flex items-center justify-center h-full w-8 transform -translate-y-1/2',
      )}
      type="button"
      onClick={() => onClean && onClean('')}
    >
      <Icons.close width={12} />
      <span className="sr-only">Очистить поле</span>
    </button>
  );
}

export default Cleanable;
