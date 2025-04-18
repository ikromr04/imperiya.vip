import GradesDeleteForm from '@/components/forms/grades/grades-delete-form';
import GradesEditForm from '@/components/forms/grades/grades-edit-form';
import { Icons } from '@/components/icons';
import AppLayout from '@/components/layouts/app-layout';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import Tooltip from '@/components/ui/tooltip';
import { AppRoute } from '@/const/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { getNextGradeId, getPreviousGradeId } from '@/utils/grades';
import React, { useEffect, useState } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';

function SuperadminGradesShow(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const grade = grades.data?.find(({ id }) => id === +(params.id || 0)) || null;
  const [isEditting, setIsEditting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const students = users.data?.filter((user) => user.student?.gradeId === grade?.id);
  const teacher = users.data?.find(({ id }) => id === grade?.teacherId);

  useEffect(() => {
    if (!grade && !grades.isFetching && params.id) dispatch(fetchGradesAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
  }, [dispatch, grade, grades.isFetching, params.id, users.data, users.isFetching]);

  if (!grade || !grades.data) {
    return (
      <AppLayout>
        <Spinner className="w-8 h-8" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <Breadcrumbs
          items={[
            ['Все классы', AppRoute.Classes.Index],
            [`${grade.level} ${grade.group}`, ''],
          ]}
        />

        <header className="flex items-end justify-end mb-4">
          <div className="flex items-center gap-1">
            <Button
              variant="light"
              href={generatePath(AppRoute.Classes.Show, { id: getPreviousGradeId(grades.data, grade.id) })}
            >
              <Icons.previous width={14} height={14} />
              <span className="sr-only md:not-sr-only">Предыдущий</span>
            </Button>
            <Button
              variant="light"
              href={generatePath(AppRoute.Classes.Show, { id: getNextGradeId(grades.data, grade.id) })}
            >
              <span className="sr-only md:not-sr-only">Следующий</span>
              <Icons.next width={14} height={14} />
            </Button>
          </div>
        </header>

        <div className="box">
          <div className="box__header">
            <h1 className="title">
              Класс {grade.level}<sup>"</sup>{grade.group}<sup>"</sup>
            </h1>

            <Button variant="light" onClick={() => setIsEditting(true)}>
              <Icons.edit width={14} height={14} />
              <Tooltip label="Редактировать" position="left" />
            </Button>
          </div>

          <section className="box__body">
            <h2 className="title !text-lg">Руководитель</h2>

            <div className="flex flex-wrap gap-1">
              {teacher && (
                <Link
                  className="py-1 px-2 border rounded bg-gray-100 hover:bg-blue-50"
                  to={generatePath(AppRoute.Users.Show, { id: teacher.id })}
                >
                  {teacher.surname} {teacher.name} {teacher.patronymic}
                </Link>
              )}
            </div>
          </section>

          <section className="box__body">
            <h2 className="title !text-lg">Ученики ({students?.length})</h2>

            <div className="flex flex-wrap gap-1">
              {students?.map(({ id, surname, name }) => (
                <Link
                  key={id}
                  className="py-1 px-2 border rounded bg-gray-100 hover:bg-blue-50"
                  to={generatePath(AppRoute.Users.Show, { id })}
                >
                  {surname} {name}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <Button
          className="ml-auto mt-2 md:mt-4"
          variant="danger"
          onClick={() => setIsDeleting(true)}
        >
          <Icons.delete width={14} height={14} />
          Удалить класс
        </Button>
      </main>

      <Modal isOpen={isDeleting}>
        <GradesDeleteForm
          grades={grades.data}
          grade={grade}
          setIsOpen={setIsDeleting}
        />
      </Modal>
      <Modal isOpen={isEditting}>
        <GradesEditForm
          grade={grade}
          grades={grades.data}
          setIsOpen={setIsEditting}
        />
      </Modal>
    </AppLayout>
  );
}

export default SuperadminGradesShow;
