import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import SelectField from '@/components/ui/form-controls/formik/select-field';
import TextField from '@/components/ui/form-controls/formik/text-field';
import { UserStoreDTO } from '@/dto/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNationalitiesAction } from '@/store/nationality-slice/nationality-api-actions';
import { getNationalities } from '@/store/nationality-slice/nationality-selector';
import { FieldArray, useFormikContext } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Step } from './users-create-form';

type BaseFieldsProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<Step>>;
};

function BaseFields({
  setIsOpen,
  setStep,
}: BaseFieldsProps): JSX.Element {
  const nationalities = useAppSelector(getNationalities);
  const dispatch = useAppDispatch();
  const {
    setFieldValue,
    values,
    errors,
    resetForm,
    setTouched,
    isSubmitting,
  } = useFormikContext<UserStoreDTO>();

  useEffect(() => {
    if (!nationalities) dispatch(fetchNationalitiesAction());
  }, [dispatch, nationalities]);

  const handleNextButtonClick = async () => {
    setTouched({
      phone_numbers: values.phone_numbers.map(() => ({
        code: true,
        numbers: true,
      })),
    });

    if (!errors.phone_numbers) setStep('role');
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="title">Базовая информация</h3>

        <Button
          className="ml-auto"
          type="reset"
          variant="error"
          icon="close"
          onClick={() => {
            setIsOpen(false);
            setStep('required');
            resetForm();
          }}
        >
          <span className="sr-only">Отмена</span>
        </Button>
      </div>

      <div className="grid gap-y-2 gap-x-4 mb-2 md:grid-cols-2">
        <TextField name="birth_date" label="Дата рождения" type="date" />
        <TextField name="email" label="Электронная почта" />

        {nationalities &&
          <SelectField
            name="nationality_id"
            label="Национальность"
            cleanable
            onClean={() => setFieldValue('nationality_id', 0)}
            options={nationalities.map(({ id, name }) => ({ value: id, label: name }))}
          />}

        <TextField name="address" label="Адрес" />
        <TextField name="social_link.facebook" label="Фейсбук" />
        <TextField name="social_link.instagram" label="Инстаграм" />
        <TextField name="social_link.telegram" label="Телеграм" />
        <TextField name="social_link.odnoklassniki" label="Одноклассники" />
      </div>

      <FieldArray name="phone_numbers">
        {({ push, remove }) => (
          <div className="flex flex-col gap-2 mb-4">
            {values.phone_numbers?.map((_, index) => (
              <div className="flex gap-2" key={index}>
                <div className="relative">
                  <TextField
                    className="w-[88px]"
                    inputClassname="pl-7"
                    type="number"
                    name={`phone_numbers.${index}.code`}
                    label="Код страны"
                    required
                  />
                  <span className="absolute top-6 left-4 transform">+</span>
                </div>
                <TextField
                  className="w-[120px] grow"
                  type="number"
                  name={`phone_numbers.${index}.numbers`}
                  label="Номер телефона"
                  required
                />
                <Button className="mt-5" variant="warn" onClick={() => remove(index)}>
                  <Icons.delete width={16} height={16} />
                </Button>
              </div>
            ))}

            <button
              className="flex text-sm justify-center items-center gap-2 rounded border border-dashed h-8 border-gray-300 bg-gray-50 mt-2"
              type="button"
              onClick={() => push({ code: '', numbers: '' })}
            >
              <Icons.add width={12} height={12} /> Добавить номер телефона
            </button>
          </div>
        )}
      </FieldArray>

      <div className="flex items-center justify-end gap-2 sm:col-span-2">
        <Button
          className="text-sm mr-auto text-blue-600 hover:text-blue-400"
          variant="text"
          type="button"
          onClick={() => setStep('required')}
        >
          <Icons.west height={8} /> Назад
        </Button>

        {(values.role !== 'student' && values.role !== 'parent')
          ?
          <Button
            className="justify-center"
            type="submit"
            icon="add"
            disabled={isSubmitting}
            loading={isSubmitting}
            variant="success"
          >
            Добавить
          </Button>
          :
          <Button
            className="text-sm text-blue-600 hover:text-blue-400"
            type="button"
            variant="text"
            onClick={handleNextButtonClick}
          >
            {(
              values.address &&
              values.birth_date &&
              values.email &&
              values.nationality_id &&
              values.social_link?.facebook &&
              values.social_link?.instagram &&
              values.social_link?.telegram &&
              values.social_link?.odnoklassniki
            ) ? 'Далее' : 'Пропустить'}
            <Icons.east height={8} />
          </Button>}
      </div>
    </>
  );
}

export default BaseFields;
