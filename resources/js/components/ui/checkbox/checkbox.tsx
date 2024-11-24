import classNames from 'classnames';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import Label from './label';
import { Icons } from '../../icons';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  label?: string;
};

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
        className="sr-only peer"
        {...field}
        {...props}
        checked={field.value}
        type="checkbox"
      />
      <span className="relative flex items-center border-gray-400 rounded-sm transition-all duration-300 peer-focus:border-gray-900 border-[2px] w-[14px] h-[14px]">
        {field.value &&
          <Icons.checked className="absolute -top-[2px] -left-[2px] text-green-600" width={14} height={14} />}
      </span>
      <Label label={label} />
    </label>
  );
}
