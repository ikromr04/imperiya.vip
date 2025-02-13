import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Button from '../ui/button';
import { useAppDispatch } from '../../hooks/index';
import { sendResetPasswordLinkAction } from '../../store/auth-slice/auth-api-actions';
import TextField from '../ui/fields/text-field';
import { ResetPasswordEmailDTO } from '../../dto/auth-dto';
import Message, { MessageProps } from '../ui/message';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Введите адрес электронной почты.')
    .email('Неверный адрес электронной почты.'),
});

type ForgotPasswordFormProps = {
  className?: string;
};

function ForgotPasswordForm({
  className,
}: ForgotPasswordFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues = { email: '' };
  const [message, setMessage] = useState<MessageProps['message']>(undefined);

  const onSubmit = async (
    values: ResetPasswordEmailDTO,
    helpers: FormikHelpers<ResetPasswordEmailDTO>
  ) => {
    helpers.setSubmitting(true);
    setMessage(undefined);

    await dispatch(sendResetPasswordLinkAction({
      dto: values,
      onSuccess: (message) => setMessage([message, 'success']),
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => setMessage([message, 'error']),
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
          <Message className="mb-4" message={message} />

          <TextField
            className="mb-5"
            name="email"
            label="Электронная почта"
          />

          <Button
            className={classNames('justify-center', isSubmitting && 'opacity-60')}
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Отправить
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordForm;
