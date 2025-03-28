import Button from '@/components/ui/button';
import { AppRoute } from '@/const/routes';
import { useAppDispatch } from '@/hooks';
import { deleteGradeAction } from '@/store/grades-slice/grades-api-actions';
import { Grade, Grades } from '@/types/grades';
import { getNextGradeId } from '@/utils/grades';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type GradesDeleteFormProps = {
  grade: Grade;
  grades: Grades;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function GradesDeleteForm({
  grade,
  grades,
  setIsOpen,
}: GradesDeleteFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (
    values: object,
    helpers: FormikHelpers<object>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteGradeAction({
      id: grade.id,
      onSuccess: () => {
        toast.success('Класс успешно удален.');
        setIsOpen(false);
        navigate(generatePath(AppRoute.Classes.Show, { id: getNextGradeId(grades, grade.id) }));
      },
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      key={grade.id}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Удаление класса</h3>

            <Button
              className="ml-auto"
              type="reset"
              icon="close"
              variant="danger"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <div className="mb-4">
            <p className="mb-2">Вы уверены что хотите удалить данный класс? Все данные связанные с этим классом будут удалены.</p>
          </div>

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
              icon="delete"
            >
              Удалить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default GradesDeleteForm;
