import React from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Button from '../ui/button';
import { Link } from 'react-router-dom';
import TextField from '../ui/form-controls/formik/text-field';
import PasswordField from '../ui/form-controls/formik/password-field';
import { LoginCredentials } from '@/dto/auth-dto';
import { useAppDispatch } from '@/hooks';
import { loginAction } from '@/store/auth-slice/auth-api-actions';
import { AppRoute } from '@/const/routes';

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

  const onSubmit = async (
    values: LoginCredentials,
    helpers: FormikHelpers<LoginCredentials>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(loginAction({
      dto: values,
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
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
          <TextField name="login" label="Логин" />

          <div className="flex flex-col mb-5">
            <Link
              className="flex ml-auto transform translate-y-full text-sm text-blue-600 transition-all duration-300 hover:text-blue-400"
              to={AppRoute.Auth.ForgotPassword}
            >
              Забыли пароль?
            </Link>
            <PasswordField name="password" label="Пароль" />
          </div>

          <Button
            className={classNames('justify-center', isSubmitting && 'opacity-60')}
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
