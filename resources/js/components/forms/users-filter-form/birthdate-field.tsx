import classNames from 'classnames';
import React from 'react';
import SelectField from '../../ui/fields/select-field';
import { DAYS, MONTHS } from '../../../const';
import dayjs from 'dayjs';
import { useField } from 'formik';
import { Icons } from '../../icons';

type BirthdateFieldProps = {
  handleSubmit: () => void;
  onClean: () => void;
};

export default function BirthdateField({
  handleSubmit,
  onClean,
}: BirthdateFieldProps): JSX.Element {
  const currentYear = dayjs().year();
  const [field, , helpers] = useField('birthDate.visibility');
  const [birth] = useField('birthDate');

  return (
    <div>
      <span className="relative z-0 rounded flex max-w-max text-sm text-gray-500 ml-2">
        Дата рождения
      </span>
      <div
        className={classNames(
          'relative flex items-center grow bg-gray-50 min-w-0 border border-gray-200 pr-8 rounded h-8 leading-none text-base pl-1 focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100',
        )}
      >
        <SelectField
          inputClassname="border-transparent bg-transparent px-1 hover:bg-transparent focus:bg-transparent w-10 justify-center"
          optionClassname="px-1"
          name="birthDate.day"
          options={[...DAYS.map((day) => ({ value: day, label: day }))]}
          onChange={() => handleSubmit()}
          placeholder="День"
        />

        <SelectField
          inputClassname="border-transparent bg-transparent px-1 hover:bg-transparent focus:bg-transparent justify-center"
          optionClassname="px-1 w-16"
          name="birthDate.month"
          options={MONTHS}
          onChange={() => handleSubmit()}
          placeholder="Месяц"
        />

        <SelectField
          inputClassname="border-transparent bg-transparent px-1 hover:bg-transparent focus:bg-transparent justify-center"
          optionClassname="px-1 w-10"
          name="birthDate.year"
          options={Array.from({ length: 100 }, (_, i) => ({ value: currentYear - i, label: String(currentYear - i) }))}
          onChange={() => handleSubmit()}
          placeholder="Год"
        />

        {(birth.value.day || birth.value.month || birth.value.year) &&
          <button
            className="flex items-center justify-center h-full w-8 ml-auto"
            type="button"
            onClick={onClean}
          >
            <Icons.close width={12} />
            <span className="sr-only">Очистить поле</span>
          </button>}

        <div className="absolute right-[.5px] top-0 rounded-r-[3px] transform w-[30px] h-[30px] flex justify-center items-center">
          <button
            className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
            type="button"
            onClick={() => {
              helpers.setValue(!field.value);
              handleSubmit();
            }}
          >
            {field.value ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
