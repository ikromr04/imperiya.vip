import React, { ReactNode, useId, useState } from 'react';
import classNames from 'classnames';
import Label from './partials/label';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import Before from './partials/before';
import Cleanable from './partials/cleanable';
import { useField } from 'formik';
import { useDropdown } from '../../../hooks/use-dropdown';
import { Options } from '../../../types';
import { Option } from '../../../types/index';
import { Icons } from '../../icons';

type SelectFieldProps = {
  name: string;
  cleanable?: boolean;
  multiple?: boolean;
  onClean?: () => void;
  onChange?: (value: Option | Options) => void;
  options: Options;
  className?: string;
  label?: string;
  before?: JSX.Element;
  after?: JSX.Element;
};

export default function SelectField(props: SelectFieldProps): JSX.Element {
  const {
    name,
    cleanable,
    multiple,
    onClean,
    onChange,
    className,
    label,
    before,
    after,
  } = props;
  const uniqueId = useId();
  const [field, meta, helpers] = useField(name);
  const [options, setOptions] = useState(props.options);
  const { ref, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();

  const onOptionClick = (option: Option) => () => {
    if (multiple) {
      if (field.value.includes(option.value)) {
        helpers.setValue([...field.value.filter((value: string | number) => value !== option.value)]);
      } else {
        helpers.setValue([...field.value, option.value]);
      }
    } else {
      helpers.setValue(option.value);
      setIsOpen(false);
    }
    if (onChange) onChange(option);
  };

  const renderSelectedOptions = (): ReactNode => {
    if (multiple) {
      return (
        <span className="flex items-center gap-1 overflow-scroll no-scrollbar">
          <span className="flex min-w-max">
            {field.value?.map((value: string | number) => props.options.find((option) => option.value === value)?.label).join(', ')}
          </span>
        </span>
      );
    }

    return props.options.find((option) => option.value === field.value)?.label;
  };

  return (
    <div ref={ref} className={classNames(className, 'relative flex flex-col')}>
      <Label label={label} htmlFor={uniqueId} />

      <div className="relative flex">
        <Before element={before} />

        <button
          className={classNames(
            'flex items-center grow bg-gray-50 min-w-0 border border-gray-200 rounded h-8 px-4 leading-none text-base focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100',
            (after || cleanable) && 'pr-8',
            (after && cleanable) && '!pr-16',
            before && 'pl-8',
            (meta.error && meta.touched) ? 'border-red-400' : 'border-gray-200',
          )}
          id={uniqueId}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
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
        className={classNames(
          'absolute top-[calc(100%+4px)] right-0 z-10 border rounded-md py-1 bg-white shadow-sm text-sm w-full transition-all duration-300 text-gray-500',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <ul>
          {options.map((option) => (
            <li key={option.value}>
              <button
                className={classNames(
                  'flex w-full items-center h-8 transition-all duration-300 hover:bg-gray-100 px-3',
                  multiple && field.value.includes(option.value) && 'bg-gray-100',
                  !multiple && (field.value === option.value) && 'bg-gray-100',
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
