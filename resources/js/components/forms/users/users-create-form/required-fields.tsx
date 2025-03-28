import Button from '@/components/ui/button';
import SelectField from '@/components/ui/formik-controls/select-field';
import TextField from '@/components/ui/formik-controls/text-field';
import { RoleName, ROLES, SexName } from '@/const/users';
import { UserStoreDTO } from '@/dto/users';
import { useAppDispatch } from '@/hooks';
import { Role, Sex } from '@/types/users';
import { useFormikContext } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { Icons } from '@/components/icons';
import Spinner from '@/components/ui/spinner';
import { checkUserLoginAction } from '@/store/users-slice/users-api-actions';
import { Step } from './users-create-form';

type RequiredFieldsProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<Step>>;
}

function RequiredFields({
  setIsOpen,
  setStep,
}: RequiredFieldsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    setFieldValue,
    values,
    setErrors,
    setTouched,
    resetForm,
  } = useFormikContext<UserStoreDTO>();

  const handleNextButtonClick = async () => {
    await setTouched({ name: true, login: true, sex: true, role: true });

    if (values.name && values.login && values.role && values.sex) {
      setIsSubmitting(true);

      await dispatch(checkUserLoginAction({
        login: values.login,
        onSuccess: () => setStep('base'),
        onValidationError: (error) => setErrors({ ...error.errors }),
        onFail: (message) => toast.error(message),
      }));

      setIsSubmitting(false);
    };
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="title">Необходимая информация</h3>

        <Button
          className="ml-auto"
          type="reset"
          variant="danger"
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

      <div className="grid gap-y-2 mb-4 gap-x-4 md:grid-cols-2">
        <TextField name="name" label="ФИО" required />
        <TextField name="login" label="Логин" required />

        <SelectField
          name="sex"
          label="Пол"
          cleanable
          onClean={() => setFieldValue('sex', '')}
          options={['male', 'female'].map((sex) => ({ value: sex, label: SexName[sex as Sex] }))}
          required
        />

        <SelectField
          name="role"
          label="Позиция"
          cleanable
          onClean={() => setFieldValue('role', '')}
          options={ROLES.map((role) => ({ value: role, label: RoleName[role as Role] }))}
          required
        />
      </div>

      <Button
        className="text-sm text-blue-600 hover:text-blue-400 ml-auto"
        type="button"
        variant="text"
        onClick={handleNextButtonClick}
        disabled={isSubmitting}
      >
        {isSubmitting && <Spinner className="!w-4 !h-4" />}
        Далее <Icons.east height={8} />
      </Button>
    </>
  );
}

export default RequiredFields;
