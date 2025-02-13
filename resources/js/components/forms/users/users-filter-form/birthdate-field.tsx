import classNames from 'classnames';
import React from 'react';
import dayjs from 'dayjs';
import { useField } from 'formik';
import SelectField from '@/components/ui/fields/select-field';
import { Icons } from '@/components/icons';

type BirthdateFieldProps = {
  handleSubmit: () => void;
  onClean: () => void;
};

function BirthdateField({
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
          inputClassname="border-transparent bg-transparent !px-1 hover:bg-transparent focus:bg-transparent w-10 justify-center"
          optionClassname="px-1"
          name="birthDate.day"
          options={[
            { value: '01', label: '01' },
            { value: '02', label: '02' },
            { value: '03', label: '03' },
            { value: '04', label: '04' },
            { value: '05', label: '05' },
            { value: '06', label: '06' },
            { value: '07', label: '07' },
            { value: '08', label: '08' },
            { value: '09', label: '09' },
            { value: '10', label: '10' },
            { value: '11', label: '11' },
            { value: '12', label: '12' },
            { value: '13', label: '13' },
            { value: '14', label: '14' },
            { value: '15', label: '15' },
            { value: '16', label: '16' },
            { value: '17', label: '17' },
            { value: '18', label: '18' },
            { value: '19', label: '19' },
            { value: '20', label: '20' },
            { value: '21', label: '21' },
            { value: '22', label: '22' },
            { value: '23', label: '23' },
            { value: '24', label: '24' },
            { value: '25', label: '25' },
            { value: '26', label: '26' },
            { value: '27', label: '27' },
            { value: '28', label: '28' },
            { value: '29', label: '29' },
            { value: '30', label: '30' },
            { value: '31', label: '31' },
          ]}
          onChange={() => handleSubmit()}
          placeholder="День"
        />

        <SelectField
          inputClassname="border-transparent bg-transparent !px-1 hover:bg-transparent focus:bg-transparent justify-center"
          optionClassname="px-1 w-16"
          name="birthDate.month"
          options={[
            { value: '01', label: 'Январь' },
            { value: '02', label: 'Февраль' },
            { value: '03', label: 'Март' },
            { value: '04', label: 'Апрель' },
            { value: '05', label: 'Май' },
            { value: '06', label: 'Июнь' },
            { value: '07', label: 'Июль' },
            { value: '08', label: 'Август' },
            { value: '09', label: 'Сентябрь' },
            { value: '10', label: 'Октябрь' },
            { value: '11', label: 'Ноябрь' },
            { value: '12', label: 'Декабрь' },
          ]}
          onChange={() => handleSubmit()}
          placeholder="Месяц"
        />

        <SelectField
          inputClassname="border-transparent bg-transparent !px-1 hover:bg-transparent focus:bg-transparent justify-center"
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

export default BirthdateField;
