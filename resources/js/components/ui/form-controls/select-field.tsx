import React, { BaseSyntheticEvent, ReactNode, useId } from 'react';
import classNames from 'classnames';
import { useDropdown } from '@/hooks/use-dropdown';
import Label from './label';
import Cleanable from './cleanable';

type SelectFieldProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
  label?: string;
  placeholder?: string;
};

function SelectField({
  className,
  value,
  onChange,
  options,
  label,
  placeholder,
}: SelectFieldProps): JSX.Element {
  const uniqueId = useId();
  const { ref, menuRef, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();

  const renderSelectedOptions = (): ReactNode => {
    if (!value) {
      return (
        <span className="text-[#a8a3b7]">
          {placeholder}
        </span>
      );
    }

    return options.find((option) => option.value === value)?.label;
  };

  return (
    <div ref={ref} className={classNames(className, 'relative flex flex-col')}>
      <Label label={label} htmlFor={uniqueId} />

      <div className="relative flex">
        <button
          className="flex items-center min-h-8 grow bg-gray-50 min-w-0 border border-gray-200 rounded pl-4 pr-8 leading-none text-base focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100"
          id={uniqueId}
          type="button"
          onClick={(evt: BaseSyntheticEvent) => !evt.target.classList.contains('remove-selection') && setIsOpen(!isOpen)}
        >
          {renderSelectedOptions()}
        </button>

        {value && (
          <Cleanable
            className={classNames('absolute right-0 top-1/2')}
            onClean={() => onChange('')}
          />
        )}
      </div>

      <div
        ref={menuRef}
        className={classNames(
          'absolute top-[calc(100%+4px)] right-0 z-10 border rounded-md pb-1 bg-white shadow-sm text-sm min-w-max w-full text-gray-500',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <ul className="max-h-56 overflow-y-auto scrollbar-y">
          {options.map((option) => (
            <li key={option.value}>
              <button
                className="flex w-full items-center h-8 transition-all duration-150 hover:bg-green-50 px-3"
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectField;
