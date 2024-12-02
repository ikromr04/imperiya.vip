import React, { SetStateAction, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Button from '../ui/button';
import { useAppDispatch } from '../../hooks/index';
import { resetPasswordAction } from '../../store/auth-slice/auth-api-actions';
import Spinner from '../ui/spinner';
import { useParams } from 'react-router-dom';
import { ResetPasswordDTO } from '../../dto/auth-dto';
import Checkbox from '../ui/checkbox/checkbox';
import TextField from '../ui/fields/text-field';
import PasswordField from '../ui/fields/password-field';

export default function ResetPasswordForm({
  className,
}: {
  className?: string;
}): JSX.Element {
  const
    dispatch = useAppDispatch(),
    { token } = useParams(),
    [message, setMessage] = useState<[message: string, success: boolean]>(['', true]),
    initialValues: ResetPasswordDTO = {
      token: token || '',
      password: '',
      password_confirmation: '',
      email: true,
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
      setMessage(['', true]);
      actions.setSubmitting(true);
      await dispatch(resetPasswordAction({
        dto: values,
        onSuccess: (message) => {
          setMessage([message, true]);
          actions.resetForm();
        },
        onValidationError: (error) => actions.setErrors({
          password: error.errors?.password?.[0],
          password_confirmation: error.errors?.password_confirmation?.[0],
        }),
        onFail: (message) => setMessage([message, false]),
      }));
      actions.setSubmitting(false);
    },

    onPasswordGenerate = (setValues: (values: SetStateAction<ResetPasswordDTO>) => void) => (password: string): void => {
      setValues((prevValues) => ({
        ...prevValues,
        password,
        password_confirmation: password,
      }));
    };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setValues }) => (
        <Form className={classNames(className, 'flex flex-col')}>
          {message[0] && <p className={classNames('mb-4', message[1] ? 'text-green-600' : 'text-red-600 ')}>{message}</p>}

          <TextField name="token" type="hidden" />

          <PasswordField
            className="mb-5"
            name="password"
            label="Новый пароль"
            generatable
            onGenerate={onPasswordGenerate(setValues)}
          />

          <PasswordField
            className="mb-5"
            name="password_confirmation"
            label="Подтвердите пароль"
          />

          <Checkbox className="mb-5" name="email" label="Отправить данные для входа на почту." />

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
