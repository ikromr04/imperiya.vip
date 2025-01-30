import React, { SetStateAction, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Button from '../ui/button';
import { useAppDispatch } from '../../hooks/index';
import { resetPasswordAction } from '../../store/auth-slice/auth-api-actions';
import { useParams } from 'react-router-dom';
import { ResetPasswordDTO } from '../../dto/auth-dto';
import Checkbox from '../ui/checkbox/checkbox';
import TextField from '../ui/fields/text-field';
import PasswordField from '../ui/fields/password-field';
import { PropsWithClassname } from '../../types';
import Message, { MessageProps } from '../ui/message';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Пароль обязателен.')
    .min(6, 'Пароль должен содержать не менее 6 символов.'),
  password_confirmation: Yup.string()
    .required('Подтверждение пароля обязателен.')
    .oneOf([Yup.ref('password')], 'Подтверждение пароля не совпадает.'),
});

function ResetPasswordForm({
  className,
}: PropsWithClassname): JSX.Element {
  const dispatch = useAppDispatch();
  const { token } = useParams();
  const [message, setMessage] = useState<MessageProps['message']>(undefined);
  const initialValues: ResetPasswordDTO = {
    token: token || '',
    password: '',
    password_confirmation: '',
    email: true,
  };

  const onSubmit = async (
    values: ResetPasswordDTO,
    helpers: FormikHelpers<ResetPasswordDTO>
  ) => {
    helpers.setSubmitting(true);
    setMessage(undefined);

    await dispatch(resetPasswordAction({
      dto: values,
      onSuccess: (message) => {
        setMessage([message, 'success']);
        helpers.resetForm();
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => setMessage([message, 'error']),
    }));

    helpers.setSubmitting(false);
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
          <Message className="mb-4" message={message} />

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
            loading={isSubmitting}
          >
            Сбросить пароль
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPasswordForm;
