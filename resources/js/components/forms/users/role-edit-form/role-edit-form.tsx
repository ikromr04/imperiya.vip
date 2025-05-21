import Button from '@/components/ui/button';
import { UserRoleUpdateDTO } from '@/dto/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { User } from '@/types/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { updateUserRoleAction } from '@/store/users-slice/users-api-actions';
import { toast } from 'react-toastify';
import { getGrades } from '@/store/grades-slice/grades-selector';
import SelectField from '@/components/ui/formik-controls/select-field';
import ContentField from '@/components/ui/formik-controls/content-field';
import { getUsers } from '@/store/users-slice/users-selector';
import TextField from '@/components/ui/formik-controls/text-field';
import { getProfessions } from '@/store/professions-slice/professions-selector';

type RoleEditFormProps = {
  user: User;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function RoleEditForm({
  user,
  setIsOpen,
}: RoleEditFormProps) {
  const dispatch = useAppDispatch();
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const professions = useAppSelector(getProfessions);

  const initialValues: UserRoleUpdateDTO = {
    grades: grades?.filter((grade) => grade.teacherId === user.id).map(({ id }) => id),
    education: user.teacher?.education,
    achievements: user.teacher?.achievements,
    work_experience: user.teacher?.workExperience,

    children: users?.filter(({ id }) => user.parent?.children?.includes(id)).map(({ id }) => id),
    profession_id: user.parent?.professionId,
    workplace: user.parent?.workplace,
    position: user.parent?.position,

    grade_id: user.student?.gradeId,
    mother_id: user.student?.motherId,
    father_id: user.student?.fatherId,
    admission_date: user.student?.admissionDate,
    previous_schools: user.student?.previousSchools,
    medical_recommendations: user.student?.medicalRecommendations,
  };

  const onSubmit = async (
    values: UserRoleUpdateDTO,
    helpers: FormikHelpers<UserRoleUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateUserRoleAction({
      id: user.id,
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
          {user.role === 'teacher' && (
            <>
              {grades &&
                <SelectField
                  name="grades"
                  label="Руководитель класса"
                  multiple
                  cleanable
                  onClean={() => setFieldValue('grades', [])}
                  options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
                />}

              <ContentField name="education" label="Образование" />
              <ContentField name="achievements" label="Достижения" />
              <ContentField name="work_experience" label="Опыт работы" />
            </>
          )}

          {user.role === 'parent' && (
            <>
              {users &&
                <SelectField
                  name="children"
                  label="Дети"
                  multiple
                  cleanable
                  searchable
                  onClean={() => setFieldValue('children', [])}
                  options={users.filter(({ role }) => role === 'student').map((user) => ({ value: user.id, label: `${user.surname} ${user.name}` }))}
                />}

              {professions && (
                <SelectField
                  name="profession_id"
                  label="Сфера деятельности"
                  searchable
                  options={professions.map(({ id, name }) => ({ value: id, label: name }))}
                  required
                />
              )}

              <TextField name="workplace" label="Место работы" required />
              <TextField name="position" label="Должность" required />
            </>
          )}

          {user.role === 'student' && (
            <>
              {grades && (
                <SelectField
                  name="grade_id"
                  label="Класс"
                  cleanable
                  onClean={() => setFieldValue('grade_id', null)}
                  options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
                />
              )}
              {users && (<>
                <SelectField
                  name="mother_id"
                  label="Мать"
                  cleanable
                  searchable
                  onClean={() => setFieldValue('mother_id', null)}
                  options={users.filter(({ role, sex }) => role === 'parent' && sex === 'female').map((user) => ({ value: user.id, label: `${user.surname} ${user.name}` }))}
                />
                <SelectField
                  name="father_id"
                  label="Отец"
                  cleanable
                  searchable
                  onClean={() => setFieldValue('father_id', null)}
                  options={users.filter(({ role, sex }) => role === 'parent' && sex === 'male').map((user) => ({ value: user.id, label: `${user.surname} ${user.name}` }))}
                />
              </>)}

              <TextField
                name="admission_date"
                label="С какого года ребенок обучается в ЧОУ «Империя знаний»"
                type="date"
                required
              />

              <ContentField
                name="previous_schools"
                label="Перечислите предыдущие школы"
                placeholder="Если нет — пишите «Нет»"
                required
              />

              <ContentField
                name="medical_recommendations"
                label="Медицинские и психологические рекомендации для ребенка"
                placeholder="Если нет — пишите «Нет»"
                required
              />
            </>
          )}

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

export default RoleEditForm;
