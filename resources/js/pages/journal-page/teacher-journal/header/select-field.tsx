import React from 'react';
import classNames from 'classnames';

type SelectFieldProps = {
  className?: string;
  inputClass?: string;
  value: string;
  options: { value: string; label: string; }[];
  placeholder?: string;
};

function SelectField({
  className,
  inputClass,
  value,
  options,
  placeholder,
}: SelectFieldProps): JSX.Element {

  return (
    <div className={classNames(className, 'relative flex flex-col')}>
      <div className="relative flex">
        <button
          className={classNames(
            'flex items-center min-h-8 max-h-8 grow bg-gray-50 min-w-0 border border-gray-200 rounded px-2 leading-none text-sm focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100 md:text-[16px]',
            !value && 'text-[#a8a3b7]',
            inputClass,
          )}
          type="button"
        >
          {!value ? placeholder : options.find((option) => option.value === value)?.label}
        </button>
      </div>
    </div>
  );
}

export default SelectField;
