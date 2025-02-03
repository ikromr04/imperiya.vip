import UsersEditForm from '@/components/forms/users/users-edit-form';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import Modal from '@/components/ui/modal';
import Tooltip from '@/components/ui/tooltip';
import { User } from '@/types/users';
import dayjs from 'dayjs';
import React, { useState } from 'react';

type EducationsProps = {
  user: User;
};

function Educations({
  user,
}: EducationsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="title !text-lg">Образование</h2>

          <Button variant="light" onClick={() => setIsOpen(true)}>
            <Icons.edit width={14} height={14} />
            <Tooltip label="Редактировать" position="left" />
          </Button>
        </header>

        {!user.role.educations?.length && <div className="box__body">Нет данных</div>}

        {user.role.educations?.map((education) => (
          <div key={education.started_at} className="relative">
            <DescriptionList
              className="box__body"
              list={{
                'Учебное заведение': education.institution,
                'Факультет': education.faculty,
                'Специальность': education.speciality,
                'Форма обучения': education.form,
                'Год поступления': dayjs(education.started_at).format('DD MMMM YYYY'),
                'Год окончания': dayjs(education.graduated_at).format('DD MMMM YYYY'),
              }}
            />
            <div className="absolute top-0 right-0 rounded-br-md z-10 min-w-6 h-full pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
          </div>
        ))}
      </section>

      <Modal isOpen={isOpen}>
        <UsersEditForm user={user} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}

export default Educations;
