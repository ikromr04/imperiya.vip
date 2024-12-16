import React, { ReactNode } from 'react';
import { PropsWithClassname } from '../../../../types';
import { Icons } from '../../../icons';
import classNames from 'classnames';
import { useField } from 'formik';

type CleanableProps = PropsWithClassname<{
  name: string;
  cleanable?: boolean;
  multiple?: boolean;
  onClean?: () => void;
}>;

export default function Cleanable({
  name,
  className,
  cleanable,
  onClean,
  multiple,
}: CleanableProps): ReactNode {
  const [field] = useField(name);

  if (!cleanable || !field.value || (multiple && field.value.length === 0)) return null;

  return (
    <button
      className={classNames(
        className,
        'flex items-center justify-center h-full w-8 transform -translate-y-1/2',
      )}
      type="button"
      onClick={onClean}
    >
      <Icons.close width={12} />
      <span className="sr-only">Очистить поле</span>
    </button>
  );
}
