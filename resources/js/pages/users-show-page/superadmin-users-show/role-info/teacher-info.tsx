import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import Tooltip from '@/components/ui/tooltip';
import { AppRoute } from '@/const/routes';
import { RoleName } from '@/const/users';
import { useAppSelector } from '@/hooks';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { User } from '@/types/users';
import React, { lazy, Suspense, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

const RoleEditForm = lazy(()  => import('@/components/forms/users/role-edit-form/role-edit-form'));

type TeacherInfoProps = {
  user: User;
};

function TeacherInfo({
  user,
}: TeacherInfoProps): JSX.Element {
  const grades = useAppSelector(getGrades);
  const [isOpen, setIsOpen] = useState(false);

  const leaderGrades = grades?.filter((grade) => grade.teacherId === user.id);

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="title md:!text-lg">{RoleName[user.role]}</h2>

          <Button variant="light" onClick={() => setIsOpen(true)}>
            <Icons.edit width={14} height={14} />
            <Tooltip label="Редактировать" position="left" />
          </Button>
        </header>

        <div className="relative">
          <DescriptionList
            className="box__body"
            list={{
              'Руководитель класса': leaderGrades?.length ? (
                <div className="flex flex-wrap gap-2">
                  {leaderGrades.map((grade) => (
                    <Link
                      key={grade.id}
                      className="text-blue-600"
                      to={generatePath(AppRoute.Classes.Show, { id: grade.id })}
                    >
                      {grade.level} {grade.group}
                    </Link>
                  ))}
                </div>
              ) : '-',
              'Образование': user.teacher?.education ?? '-',
              'Достижения': user.teacher?.achievements ?? '-',
              'Опыт работы': user.teacher?.workExperience ?? '-',
            }}
          />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <Suspense fallback={<Spinner className="w-10 h-10" />}>
            <RoleEditForm
              user={user}
              setIsOpen={setIsOpen}
            />
          </Suspense>
        </Modal>
      )}
    </>
  );
}

export default TeacherInfo;
