import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useAppDispatch } from '../../hooks';
import { UserFilterDTO } from '../../dto/user';
import classNames from 'classnames';
import { PropsWithClassname } from '../../types';
import TextField from '../ui/fields/text-field';
import { Icons } from '../icons';
import Spinner from '../ui/spinner';

export function UsersSearchForm({
  className,
}: PropsWithClassname): JSX.Element {
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: UserFilterDTO,
    helpers: FormikHelpers<UserFilterDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(filterUsers(values));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={classNames(className, 'flex')}>
          <TextField
            className="grow"
            inputClassname="w-4 bg-white rounded-r-none rounded-l-md hover:bg-white focus:bg-white"
            type="search"
            name="query"
            before={isSubmitting ? <Spinner className="w-4" /> : <Icons.usersSearch width={16} />}
            placeholder="Поиск по имени, логину, электронной почте или номеру телефона"
          />
        </Form>
      )}
    </Formik>
  );
}
