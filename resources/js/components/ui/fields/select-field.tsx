import React, { BaseSyntheticEvent, ReactNode, useId, useState } from 'react';
import classNames from 'classnames';
import Label from './partials/label';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import Before from './partials/before';
import Cleanable from './partials/cleanable';
import { useField } from 'formik';
import { Option, Options } from '@/types';
import { useDropdown } from '@/hooks/use-dropdown';
import { Icons } from '@/components/icons';

type SelectFieldProps = {
  name: string;
  searchable?: boolean;
  cleanable?: boolean;
  multiple?: boolean;
  onClean?: () => void;
  onChange?: (value: Option | Options) => void;
  options: Options;
  className?: string;
  inputClassname?: string;
  optionClassname?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  before?: JSX.Element;
  after?: JSX.Element;
};

function SelectField(props: SelectFieldProps): JSX.Element {
  const {
    name,
    searchable,
    cleanable,
    multiple,
    onClean,
    onChange,
    className,
    placeholder,
    label,
    required,
    before,
    after,
    inputClassname,
    optionClassname,
  } = props;
  const uniqueId = useId();
  const [field, meta, helpers] = useField(name);
  const [options, setOptions] = useState(props.options);
  const { ref, menuRef, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();

  const onOptionClick = (option: Option) => () => {
    if (multiple) {
      if ((field.value || []).includes(option.value)) {
        helpers.setValue([...field.value.filter((value: string | number) => value !== option.value)]);
      } else {
        helpers.setValue([...(field.value || []), option.value]);
      }
    } else {
      helpers.setValue(option.value);
      setIsOpen(false);
    }
    if (onChange) onChange(option);
  };

  const removeSelection = (removeValue: string | number) => () => {
    helpers.setValue([...field.value.filter((value: string | number) => value !== removeValue)]);
    if (onChange) onChange(options.find((option) => option.value.toString() === removeValue.toString()) || []);
  };

  const renderSelectedOptions = (): ReactNode => {
    if (!field.value) {
      return (
        <span className="text-[#a8a3b7]">
          {placeholder}
        </span>
      );
    }

    if (multiple) {
      return (
        <span className="flex flex-wrap py-[2px] items-center gap-1">
          {field.value?.map((value: string | number) => {
            const currentValue = props.options.find((option) => option.value === value);

            return (
              <span key={value} className="flex items-center gap-2 border h-6 pr-2 rounded bg-white text-sm min-w-max">
                <span
                  className="remove-selection flex items-center justify-center rounded-l h-[22px] w-[22px] hover:text-error hover:bg-red-50"
                  onClick={removeSelection(currentValue?.value || '')}
                >
                  <Icons.close className="pointer-events-none" width={10} height={10} />
                </span>
                {currentValue?.label}
              </span>
            );
          })}
        </span>
      );
    }

    return props.options.find((option) => option.value === field.value)?.label;
  };

  return (
    <div ref={ref} className={classNames(className, 'relative flex flex-col')}>
      <Label required={required} label={label} htmlFor={uniqueId} />

      <div className="relative flex">
        <Before element={before} />

        <button
          className={classNames(
            inputClassname,
            'flex items-center grow bg-gray-50 min-w-0 border border-gray-200 rounded px-4 leading-none text-base focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100',
            multiple ? 'min-h-8 px-[3px]' : 'h-8',
            (after || cleanable) && 'pr-8',
            (after && cleanable) && '!pr-16',
            before && 'pl-8',
            (meta.error && meta.touched) ? 'border-red-400' : 'border-gray-200',
          )}
          id={uniqueId}
          type="button"
          onClick={(evt: BaseSyntheticEvent) => !evt.target.classList.contains('remove-selection') && setIsOpen(!isOpen)}
        >
          {renderSelectedOptions()}
        </button>

        <Cleanable
          className={classNames('absolute top-1/2', after ? 'right-8' : 'right-0')}
          name={name}
          cleanable={cleanable}
          multiple
          onClean={onClean}
        />

        <After element={after} />
      </div>

      <ErrorMessage name={name} />

      <div
        ref={menuRef}
        className={classNames(
          'absolute top-[calc(100%+4px)] right-0 z-10 border rounded-md pb-1 bg-white shadow-sm text-sm min-w-max w-full text-gray-500',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          searchable ? 'pt-0' : 'pt-1'
        )}
      >
        {searchable &&
          <input
            className="flex items-center grow bg-gray-50 min-w-0 rounded-t h-8 px-4 leading-none text-sm w-full focus:outline-none hover:bg-gray-50  focus:bg-gray-50"
            type="search"
            placeholder="Поиск"
            onInput={(evt: BaseSyntheticEvent) => setOptions(props.options.filter((option) => option.label.toLowerCase().includes(evt.target.value.toLowerCase())))}
          />}

        <ul className="max-h-56 overflow-y-auto scrollbar-y">
          {options.map((option) => (
            <li key={option.value}>
              <button
                className={classNames(
                  optionClassname,
                  'flex w-full items-center h-8 transition-all duration-300 hover:bg-green-50 px-3',
                  multiple && (field.value || []).includes(option.value) && 'bg-blue-50 hover:bg-red-50',
                  !multiple && (field.value === option.value) && 'bg-blue-50 hover:bg-red-50',
                )}
                type="button"
                onClick={onOptionClick(option)}
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
