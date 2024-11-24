import React, { SetStateAction, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Input from '../../ui/input/input';
import Button from '../../ui/button';
import { useAppDispatch } from '../../../hooks/index';
import { resetPasswordAction } from '../../../store/auth-slice/auth-api-actions';
import Spinner from '../../ui/spinner';
import { useParams } from 'react-router-dom';
import { ResetPasswordDTO } from '../../../dto/auth-dto';
import Password from './password';
import { generateRandomPassword } from '../../../utils';
import PasswordConfirmation from './password-confirmation';
import Checkbox from '../../ui/checkbox/checkbox';

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
      mail: true,
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
      helpers: FormikHelpers<ResetPasswordDTO>
    ) => {
      setSuccessMessage('');
      setErrorMessage('');
      await dispatch(resetPasswordAction({
        dto: values,
        onError: (error) => {
          helpers.setErrors({
            password: error.errors?.password?.[0],
            password_confirmation: error.errors?.password_confirmation?.[0],
          });
          setErrorMessage(error.message);
        },
        onSuccess: (message) => {
          setSuccessMessage(message);
          helpers.resetForm();
        },
      }));
      helpers.setSubmitting(false);
    },

    handlePasswordGenerate = (setValues: (values: SetStateAction<ResetPasswordDTO>, shouldValidate?: boolean) => void) => (): void => {
      const newPassword = generateRandomPassword();

      setValues((prevValues) => ({
        ...prevValues,
        password: newPassword,
        password_confirmation: newPassword,
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
          {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

          <Input name="token" type="hidden" />

          <Password onPasswordGenerate={handlePasswordGenerate(setValues)} />

          <PasswordConfirmation />

          <Checkbox className="mb-5" name="mail" label="Отправить данные для входа на почту." />

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
