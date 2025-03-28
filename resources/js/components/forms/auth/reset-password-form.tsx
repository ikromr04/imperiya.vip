import React, { SetStateAction, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import { ResetPasswordDTO } from '@/dto/auth-dto';
import Message, { MessageProps } from '@/components/ui/message';
import { resetPasswordAction } from '@/store/auth-slice/auth-api-actions';
import TextField from '@/components/ui/formik-controls/text-field';
import PasswordField from '@/components/ui/formik-controls/password-field';
import Checkbox from '@/components/ui/checkbox/checkbox';
import Button from '@/components/ui/button';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Пароль обязателен.')
    .min(6, 'Пароль должен содержать не менее 6 символов.'),
  password_confirmation: Yup.string()
    .required('Подтверждение пароля обязателен.')
    .oneOf([Yup.ref('password')], 'Подтверждение пароля не совпадает.'),
});

type ResetPasswordFormProps = {
  className?: string;
};

function ResetPasswordForm({
  className,
}: ResetPasswordFormProps): JSX.Element {
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
