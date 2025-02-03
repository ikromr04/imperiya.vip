import classNames from 'classnames';
import React, { ReactNode } from 'react';

type DescriptionListProps = {
  className?: string;
  variant?: 'default' | 'detailed';
  list: {
    [term: string]: ReactNode;
  };
};

export default function DescriptionList({
  className,
  variant = 'default',
  list,
}: DescriptionListProps): JSX.Element {
  return (
    <dl
      className={classNames(
        'flex flex-col gap-2',
        className,
      )}
    >
      {Object.entries(list).map(([term, definition]) => (
        <div
          key={term}
          className={classNames(
            'flex gap-x-4 min-w-max',
            (variant === 'detailed') && 'flex-col'
          )}
        >
          <dt
            className={classNames(
              'block min-w-40 text-gray-500',
              (variant === 'detailed') && 'text-sm'
            )}
          >
            {term}
          </dt>
          <dd
            className={classNames(
              'block min-w-max',
              (variant === 'detailed') && 'font-medium'
            )}
          >
            {definition}
          </dd>
        </div>
      ))}
    </dl>
  );
}
