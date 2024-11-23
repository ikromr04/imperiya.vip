import React, { useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Input from '../ui/input/input';
import Button from '../ui/button';
import { useAppDispatch } from '../../hooks/index';
import { sendResetPasswordLinkAction } from '../../store/auth-slice/auth-api-actions';
import Spinner from '../ui/spinner';

type FormValues = {
  email: string;
};

export default function ForgotPasswordForm({
  className,
}: {
  className?: string;
}): JSX.Element {
  const
    dispatch = useAppDispatch(),
    [successMessage, setSuccessMessage] = useState<string>(''),
    [errorMessage, setErrorMessage] = useState<string>(''),
    initialValues: FormValues = { email: '' },
    validationSchema = yup.object().shape({
      email: yup.string()
        .required('Введите адрес электронной почты.')
        .email('Неверный адрес электронной почты.'),
    }),

    onSubmit = async (
      values: FormValues,
      actions: FormikHelpers<FormValues>
    ) => {
      setSuccessMessage('');
      setErrorMessage('');
      await dispatch(sendResetPasswordLinkAction({
        dto: values,
        onError: (error) => {
          actions.setErrors({ email: error.errors?.email?.[0] });
          setErrorMessage(error.message);
        },
        onSuccess: (message) => setSuccessMessage(message),
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

          <Input
            className="mb-5"
            name="email"
            label="Электронная почта"
          />

          <Button
            className={classNames('justify-center', isSubmitting && 'opacity-60')}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner className="w-6 h-6 m-auto" /> : 'Отправить'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
