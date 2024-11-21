import React from 'react';
import { LoginCredentials } from '../../types/auth';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Input from '../ui/input/input';
import Button from '../ui/button';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

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
        <Form className={classNames(className, 'flex flex-col max-w-[400px] sm:min-w-[400px]')}>
          <Input className="mb-2" name="login" label="Логин" />

          <div className="flex flex-col mb-8">
            <Link className="ml-auto text-blue-600 transition-all duration-300 hover:text-blue-400" to={AppRoute.Auth.ResetPassword}>
              Забыли пароль?
            </Link>
            <Input name="password" label="Пароль" />
          </div>

          <Button
            className="justify-center"
            type="submit"
            disabled={isSubmitting}
          >
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
}
