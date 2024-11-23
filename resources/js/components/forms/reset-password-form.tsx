import React, { useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Input from '../ui/input/input';
import Button from '../ui/button';
import { useAppDispatch } from '../../hooks/index';
import { resetPasswordAction } from '../../store/auth-slice/auth-api-actions';
import Spinner from '../ui/spinner';
import { useParams } from 'react-router-dom';
import { ResetPasswordDTO } from '../../dto/auth-dto';

export default function ResetPasswordForm({
  className,
}: {
  className?: string;
}): JSX.Element {
  const
    dispatch = useAppDispatch(),
    { token } = useParams(),
    [successMessage, setSuccessMessage] = useState<string>(''),
    [errorMessage, setErrorMessage] = useState<string>(''),
    initialValues: ResetPasswordDTO = {
      token: token || '',
      password: '',
      password_confirmation: '',
    },
    validationSchema = yup.object().shape({
      password: yup.string()
        .required('Пароль обязателен.')
        .min(6, 'Пароль должен содержать не менее 6 символов.'),
      password_confirmation: yup.string()
        .required('Подтверждение пароля обязателен.')
        .oneOf([yup.ref('password')], 'Подтверждение пароля не совпадает.'),
    }),

    onSubmit = async (
      values: ResetPasswordDTO,
      actions: FormikHelpers<ResetPasswordDTO>
    ) => {
      setSuccessMessage('');
      setErrorMessage('');
      await dispatch(resetPasswordAction({
        dto: values,
        onError: (error) => {
          actions.setErrors({
            password: error.errors?.password?.[0],
            password_confirmation: error.errors?.password_confirmation?.[0],
          });
          setErrorMessage(error.message);
        },
        onSuccess: (message) => {
          setSuccessMessage(message);
          actions.resetForm();
        },
      }));
      actions.setSubmitting(false);
    };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={classNames(className, 'flex flex-col')}>
          {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

          <Input name="token" type="hidden" />

          <Input
            className="mb-5"
            name="password"
            label="Новый пароль"
            type="password"
          />

          <Input
            className="mb-5"
            name="password_confirmation"
            label="Подтвердите пароль"
            type="password"
          />

          <Button
            className={classNames('justify-center', isSubmitting && 'opacity-60')}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner className="w-6 h-6 m-auto" /> : 'Сбросить пароль'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
