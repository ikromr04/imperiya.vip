import React from 'react';
import { LoginCredentials } from '../../types/auth';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Input from '../ui/input/input';

export default function LoginForm({
  className,
}: {
  className?: string;
}): JSX.Element {
  const
    initialValues: LoginCredentials = {
      login: '',
      password: '',
    },
    validationSchema = yup.object().shape({
      login: yup.string().required('Введите Ваш логин.'),
      password: yup.string().required('Введите Ваш пароль.'),
    }),

    onSubmit = async (
      values: LoginCredentials,
      actions: FormikHelpers<LoginCredentials>,
    ) => {
      actions.setSubmitting(true);
      console.log(values);
    };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={classNames(className, 'bg-white p-6 !w-[400px]')}>
          <Input name="login" label="Логин" placeholder="Введите Ваш логин" />
        </Form>
      )}
    </Formik>
  );
}
