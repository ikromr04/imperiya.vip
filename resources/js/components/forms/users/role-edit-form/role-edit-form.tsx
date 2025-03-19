import Button from '@/components/ui/button';
import { RoleUpdateDTO } from '@/dto/users';
import { useAppDispatch } from '@/hooks';
import { User, Users } from '@/types/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import RoleFields from './role-fields';
import { updateUserRoleAction } from '@/store/users-slice/users-api-actions';
import { toast } from 'react-toastify';
import { Grade } from '@/types/grades';

type RoleEditFormProps = {
  user: User;
  grade: Grade | undefined;
  mother: User | undefined;
  father: User | undefined;
  children: Users;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function RoleEditForm({
  user,
  grade,
  mother,
  father,
  children,
  setIsOpen,
}: RoleEditFormProps) {
  const dispatch = useAppDispatch();
  const initialValues: RoleUpdateDTO = {
    user_id: user.id,
    grade_id: grade?.id,
    mother_id: mother?.id,
    father_id: father?.id,
    children: children.map(({ id }) => id),
  };

  const onSubmit = async (
    values: RoleUpdateDTO,
    helpers: FormikHelpers<RoleUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateUserRoleAction({
      dto: values,
      onSuccess: () => {
        toast.success('Данные успешно сохранены.');
        setIsOpen(false);
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      key={JSON.stringify(user[user.role as keyof typeof user])}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-3">
          <RoleFields user={user} setFieldValue={setFieldValue} />

          <div className="flex items-center justify-end gap-2 mt-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
            >
              Сохранить
            </Button>
            <Button
              type="reset"
              onClick={() => setIsOpen(false)}
              variant="error"
            >
              Отмена
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RoleEditForm;
