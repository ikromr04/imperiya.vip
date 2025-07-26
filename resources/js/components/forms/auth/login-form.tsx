import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { LoginCredentials } from '@/dto/auth-dto';
import { useAppDispatch } from '@/hooks';
import { loginAction } from '@/store/auth-slice/auth-api-actions';
import { AppRoute } from '@/const/routes';
import Button from '@/components/ui/button';
import PasswordField from '@/components/ui/formik-controls/password-field';
import TextField from '@/components/ui/formik-controls/text-field';

const validationSchema = Yup.object().shape({
  login: Yup.string().required('Введите Ваш логин.'),
  password: Yup.string().required('Введите Ваш пароль.'),
});

type LoginFormProps = {
  className?: string;
}

function LoginForm({
  className,
}: LoginFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: LoginCredentials = { login: '', password: '' };
  const [isBlocked, setIsBlocked] = useState(false);

  const onSubmit = async (
    values: LoginCredentials,
    helpers: FormikHelpers<LoginCredentials>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(loginAction({
      dto: values,
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onBlocked: () => setIsBlocked(true),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={classNames(className, 'flex flex-col')}>
          {isBlocked && (
            <p className="text-danger leading-[1.2] mb-4">
              Профиль заблокирован. <a className="text-blue-600" href="https://wa.me/+992918339939" target="_blank">Узнать причину.</a>
            </p>
          )}
          <TextField name="login" label="Логин" />

          <div className="flex flex-col mb-5">
            <Link
              className="flex ml-auto transform translate-y-[90%] text-sm text-blue-600 transition-all duration-150 hover:text-blue-400"
              to={AppRoute.Auth.ForgotPassword}
            >
              Забыли пароль?
            </Link>
            <PasswordField name="password" label="Пароль" />
          </div>

          <Button
            className="justify-center"
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
