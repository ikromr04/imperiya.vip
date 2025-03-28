import Button from '@/components/ui/button';
import { AppRoute } from '@/const/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { deleteUserAction, fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { User } from '@/types/users';
import { getNextUserId } from '@/utils/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type UsersDeleteFormProps = {
  user: User;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function UsersDeleteForm({
  user,
  setIsOpen,
}: UsersDeleteFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector(getUsers);

  useEffect(() => {
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
  }, [dispatch, users.data, users.isFetching]);

  const onSubmit = async (
    values: object,
    helpers: FormikHelpers<object>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteUserAction({
      id: user.id,
      onSuccess: () => {
        toast.success('Пользователь успешно удален.');
        setIsOpen(false);
        navigate(generatePath(AppRoute.Users.Show, { id: getNextUserId(users.data || [], user.id) }));
      },
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      key={user.id}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <p>Вы уверены что хотите удалить этого пользователья? Все данные связанные с этим пользователем будут удалены.</p>

          <div className="flex items-center justify-end gap-2 mt-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
            >
              Удалить
            </Button>
            <Button
              type="reset"
              onClick={() => setIsOpen(false)}
              variant="danger"
            >
              Отмена
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UsersDeleteForm;
