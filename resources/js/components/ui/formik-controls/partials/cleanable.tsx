import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useField } from 'formik';
import { Icons } from '@/components/icons';

type CleanableProps = {
  className?: string;
  name: string;
  cleanable?: boolean;
  multiple?: boolean;
  onClean?: () => void;
};

function Cleanable({
  name,
  className,
  cleanable,
  onClean,
  multiple,
}: CleanableProps): ReactNode {
  const [field] = useField(name);

  if (!cleanable || !field.value || (multiple && field.value.length === 0)) return;

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

export default Cleanable;
