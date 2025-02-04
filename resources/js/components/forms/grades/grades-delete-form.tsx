import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/checkbox';
import { AppRoute } from '@/const';
import { GradeDeleteDTO } from '@/dto/grades';
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
  const initialValues: GradeDeleteDTO = {
    grade_id: grade.id,
    students_deletion: false,
  };

  const onSubmit = async (
    values: GradeDeleteDTO,
    helpers: FormikHelpers<GradeDeleteDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteGradeAction({
      dto: values,
      onSuccess: () => {
        toast.success('Класс успешно удален.');
        setIsOpen(false);
        navigate(generatePath(AppRoute.Classes.Show, { classId: getNextGradeId(grades || [], grade.id) }));
      },
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      key={grade.id}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <p>Вы уверены что хотите удалить данный класс? Все данные связанные с этим классом будут удалены.</p>
          <Checkbox name="students_deletion" label="Также удалить всех учеников этого класса" />

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

export default GradesDeleteForm;
