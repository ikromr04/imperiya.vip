import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import TextField from '@/components/ui/fields/text-field';
import { UserUpdateDTO } from '@/dto/users';
import { useAppDispatch } from '@/hooks';
import { updateUserAction } from '@/store/users-slice/users-api-actions';
import { User } from '@/types/users';
import classNames from 'classnames';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phone_numbers: Yup.array()
    .of(
      Yup.object().shape({
        numbers: Yup.number().required(' '),
        code: Yup.number().required(' '),
      })
    ),
});

type UsersPhoneEditFormProps = {
  user: User;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function UsersPhoneEditForm({
  user,
  setIsOpen,
}: UsersPhoneEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: UserUpdateDTO = {
    id: user.id,
    name: user.name,
    login: user.login,
    phone_numbers: user.phoneNumbers
  };

  const onSubmit = async (
    values: UserUpdateDTO,
    helpers: FormikHelpers<UserUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateUserAction({
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      key={user.id}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <FieldArray name="phone_numbers">
            {({ push, remove }) => (
              <>
                {values.phone_numbers?.map((phone, index) => (
                  <div className="flex items-end gap-2" key={index}>
                    <div className="relative">
                      <TextField
                        className="w-[88px]"
                        inputClassname="pl-7"
                        type="number"
                        name={`phone_numbers.${index}.code`}
                        label="Код страны"
                        required
                      />
                      <span className="absolute top-6 left-4 transform">+</span>
                    </div>
                    <TextField
                      className="w-[120px] grow"
                      type="number"
                      name={`phone_numbers.${index}.numbers`}
                      label="Номер телефона"
                      required
                    />
                    <Button variant="warn" onClick={() => remove(index)}>
                      <Icons.delete width={16} height={16} />
                    </Button>
                  </div>
                ))}

                <button
                  className="flex justify-center items-center gap-2 rounded border border-dashed h-8 border-gray-300 bg-gray-50 mt-2"
                  type="button"
                  onClick={() => push({ code: '', numbers: '' })}
                >
                  <Icons.add width={12} height={12} /> Добавить
                </button>
              </>
            )}
          </FieldArray>

          <div className="flex items-center justify-end gap-2 mt-6 sm:col-span-2">
            <Button
              className={classNames('justify-center min-w-[92px]', isSubmitting && 'opacity-60')}
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

export default UsersPhoneEditForm;
