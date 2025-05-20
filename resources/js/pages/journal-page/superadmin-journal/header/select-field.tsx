import React, { BaseSyntheticEvent } from 'react';
import classNames from 'classnames';
import { useDropdown } from '@/hooks/use-dropdown';

type SelectFieldProps = {
  className?: string;
  inputClass?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
  placeholder?: string;
};

function SelectField({
  className,
  inputClass,
  value,
  onChange,
  options,
  placeholder,
}: SelectFieldProps): JSX.Element {
  const { ref, menuRef, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames(className, 'relative flex flex-col')}>
      <div className="relative flex">
        <button
          className={classNames(
            'flex items-center min-h-8 max-h-8 grow bg-gray-50 min-w-0 border border-gray-200 rounded px-2 leading-none text-sm focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100 md:text-[16px]',
            !value && 'text-[#a8a3b7]',
            inputClass,
          )}
          type="button"
          onClick={(evt: BaseSyntheticEvent) => !evt.target.classList.contains('remove-selection') && setIsOpen(!isOpen)}
        >
          {!value ? placeholder : options.find((option) => option.value === value)?.label}
        </button>
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
