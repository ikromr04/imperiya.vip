import React, { BaseSyntheticEvent, InputHTMLAttributes, useId } from 'react';
import classNames from 'classnames';
import Label from './partials/label';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import Before from './partials/before';
import { useField } from 'formik';

type ContentFieldProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  className?: string;
  inputClassname?: string;
  label?: string;
  required?: boolean;
  before?: JSX.Element;
  after?: JSX.Element;
};

export default function ContentField({
  name,
  className,
  label,
  before,
  after,
  required,
  ...props
}: ContentFieldProps): JSX.Element {
  const uniqueId = useId();
  const [field, meta] = useField(name);

  const onInput = (evt: BaseSyntheticEvent) => {
    evt.target.style.height = 'auto';
    evt.target.style.height = `${evt.target.scrollHeight}px`;
  };

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <Label label={label} htmlFor={uniqueId} required={required} />

      <div className="relative flex">
        <Before element={before} />

        <textarea
          className={classNames(
            'flex grow bg-gray-50 min-w-0 border border-gray-200 min-h-20 rounded p-2 leading-none text-base overflow-hidden resize-none focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100',
            (meta.error && meta.touched) ? 'border-red-400' : 'border-gray-200',
          )}
          {...field}
          {...props}
          id={uniqueId}
          name={name}
          onInput={onInput}
        ></textarea>

        <After element={after} />
      </div>

      <ErrorMessage name={name} />
    </div>
  );
}
