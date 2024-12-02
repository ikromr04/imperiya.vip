import React, { useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import Button from '../ui/button';
import { useAppDispatch } from '../../hooks/index';
import { sendResetPasswordLinkAction } from '../../store/auth-slice/auth-api-actions';
import Spinner from '../ui/spinner';
import TextField from '../ui/fields/text-field';
import { ResetPasswordEmailDTO } from '../../dto/auth-dto';

export default function ForgotPasswordForm({
  className,
}: {
  className?: string;
}): JSX.Element {
  const
    dispatch = useAppDispatch(),
    initialValues: ResetPasswordEmailDTO = { email: '' },
    validationSchema = yup.object().shape({
      email: yup.string()
        .required('Введите адрес электронной почты.')
        .email('Неверный адрес электронной почты.'),
    }),
    [message, setMessage] = useState<[message: string, success: boolean]>(['', true]),

    onSubmit = async (
      values: ResetPasswordEmailDTO,
      actions: FormikHelpers<ResetPasswordEmailDTO>
    ) => {
      setMessage(['', true]);
      actions.setSubmitting(true);
      await dispatch(sendResetPasswordLinkAction({
        dto: values,
        onSuccess: (message) => setMessage([message, true]),
        onValidationError: (error) => actions.setErrors({ email: error.errors?.email?.[0] }),
        onFail: (message) => setMessage([message, false]),
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
          {message[0] && <p className={classNames('mb-4', message[1] ? 'text-green-600' : 'text-red-600 ')}>{message}</p>}

          <TextField
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
