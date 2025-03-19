import { UserStoreDTO } from '@/dto/users';
import { useAppDispatch } from '@/hooks';
import { storeUserAction } from '@/store/users-slice/users-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import RequiredFields from './required-fields';
import BaseFields from './base-fields';
import RoleFields from './role-fields';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
  login: Yup.string().required('Обязательное поле.'),
  role: Yup.string().required('Обязательное поле.'),
  sex: Yup.string().required('Обязательное поле.'),
  email: Yup.string().email('Неверный адрес электронной почты.'),
  phone_numbers: Yup.array()
    .of(
      Yup.object().shape({
        numbers: Yup.number().required(' '),
        code: Yup.number().required(' '),
      })
    ),
});

export type Step = 'required' | 'base' | 'role';

type UsersCreateFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function UsersCreateForm({
  setIsOpen,
}: UsersCreateFormProps): JSX.Element {
  const [step, setStep] = useState<Step>('required');
  const dispatch = useAppDispatch();
  const initialValues: UserStoreDTO = {
    name: '',
    login: '',
    role: 'student',
    sex: 'male',
    phone_numbers: [],
  };

  const onSubmit = async (
    values: UserStoreDTO,
    helpers: FormikHelpers<UserStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeUserAction({
      dto: values,
      onSuccess: () => {
        toast.success('Пользователь успешно добавлен.');
        setIsOpen(false);
        setStep('required');
        helpers.resetForm();
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="flex flex-col">
        {step === 'required' && <RequiredFields setStep={setStep} setIsOpen={setIsOpen} />}
        {step === 'base' && <BaseFields setStep={setStep} setIsOpen={setIsOpen} />}
        {step === 'role' && <RoleFields setStep={setStep} setIsOpen={setIsOpen} />}
      </Form>
    </Formik>
  );
}

export default UsersCreateForm;
