import classNames from 'classnames';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import Label from './label';
import { Icons } from '../../icons';
import { PropsWithClassname } from '../../../types';

type CheckboxProps = PropsWithClassname<InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
}>;

export default function Checkbox({
  name,
  className,
  label,
  ...props
}: CheckboxProps): JSX.Element {
  const [field] = useField(name);

  return (
    <label className={classNames(className, 'flex items-center max-w-max cursor-pointer')}>
      <input
        {...field}
        {...props}
        className="sr-only"
        checked={field.value}
        type="checkbox"
      />
      <span
        className={classNames(
          'flex items-center rounded-sm transition-all duration-300 border-[2px] w-4 h-4',
          field.value ? ' border-green-600 bg-green-600' : 'border-gray-500',
        )}
      >
        <Icons.checked className="text-white" />
      </span>
      <Label label={label} />
    </label>
  );
}
