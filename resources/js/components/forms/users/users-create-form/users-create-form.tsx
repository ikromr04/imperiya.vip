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
  name: Yup.string().required('Имя обязательно для заполнения.'),
  surname: Yup.string().required('Фамилия обязательна для заполнения.'),
  login: Yup.string().required('Обязательное поле.'),
  sex: Yup.string().required('Укажите пол.'),
  birth_date: Yup.string().required('Укажите дату рождения.'),
  nationality_id: Yup.number()
    .required('Укажите национальность.')
    .min(1, 'Укажите национальность.'),
  email: Yup.string().email('Неверный адрес электронной почты.'),
  role: Yup.string().required('Укажите позицию пользователя.'),
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
    surnname: '',
    login: '',
    role: 'student',
    sex: 'male',
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
