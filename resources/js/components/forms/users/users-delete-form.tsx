import * as Yup from 'yup';
import Button from '@/components/ui/button';
import { AppRoute } from '@/const/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { deleteUserAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { User } from '@/types/users';
import { getNextUserId } from '@/utils/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SelectField from '@/components/ui/formik-controls/select-field';
import { Option } from '@/types';
import { getReasons, getReasonsStatus } from '@/store/reasons-slice/reasons-selector';
import { AsyncStatus } from '@/const/store';
import { fetchReasonsAction } from '@/store/reasons-slice/reasons-api-actions';
import { UserDeleteDTO } from '@/dto/users';

const validationSchema = Yup.object().shape({
  reason_id: Yup.number().required('Укажите причину.'),
});

const initialValues: UserDeleteDTO = {
  reason_id: '',
};

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
  const reasonsStatus = useAppSelector(getReasonsStatus);
  const reasons = useAppSelector(getReasons);

  useEffect(() => {
    if (reasonsStatus === AsyncStatus.Idle) dispatch(fetchReasonsAction());
  }, [dispatch, reasonsStatus]);

  const onSubmit = async (
    values: UserDeleteDTO,
    helpers: FormikHelpers<UserDeleteDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteUserAction({
      id: user.id,
      reasonId: +values.reason_id,
      onSuccess: () => {
        toast.success('Пользователь успешно удален.');
        setIsOpen(false);
        navigate(generatePath(AppRoute.Users.Show, { id: getNextUserId(users || [], user.id) }));
      },
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      key={user.id}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-3">
          <p>Вы уверены что хотите удалить этого пользователья? Все данные связанные с этим пользователем будут удалены.</p>

          {reasons && (
            <SelectField
              name="reason_id"
              label="Укажите причина"
              onChange={(value) => setFieldValue('reason_id', (value as Option).value)}
              options={reasons.map((reason) => ({ value: reason.id, label: reason.description }))}
              required
            />
          )}

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
