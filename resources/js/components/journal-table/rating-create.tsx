import { useDropdown } from '@/hooks/use-dropdown';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Icons } from '../icons';
import { UserId } from '@/types/users';
import { RatingName } from '@/const/ratings';
import { GradeId } from '@/types/grades';
import { SubjectId } from '@/types/subjects';
import { Rating } from '@/types/ratings';
import RatingEdit from './rating-edit';
import RatingsCreateForm from '../forms/ratings/ratings-create-form';

type RatingCreateProps = {
  createDTO: {
    years: string;
    rating: keyof typeof RatingName;
    studentId: UserId;
    gradeId: GradeId;
    subjectId: SubjectId;
  };
  studentName: string;
}

function RatingCreate({
  studentName,
  createDTO,
}: RatingCreateProps): JSX.Element {
  const { ref, isOpen, setIsOpen, menuRef } = useDropdown<HTMLDivElement>();
  const [rating, setRating] = useState<Rating | null>();

  const handleButtonClick = async () => {
    if (ref.current && menuRef.current) {
      await setIsOpen(!isOpen);
      const containerRect = ref.current.getBoundingClientRect();

      menuRef.current.style.top = `${containerRect.top + containerRect.height + 4}px`;
      menuRef.current.style.left = `${containerRect.left + containerRect.width + 4}px`;
      const menuRect = menuRef.current.getBoundingClientRect();
      if (menuRect.right > window.innerWidth) {
        menuRef.current.style.transform = `translateX(-${menuRect.right - window.innerWidth + 32}px)`;
      }
      if (menuRect.bottom > window.innerHeight) {
        menuRef.current.style.top = 'auto';
        menuRef.current.style.bottom = '16px';
      }
    }
  };

  if (rating) {
    return (
      <RatingEdit
        rating={rating}
        studentName={studentName}
      />
    );
  }

  return (
    <div ref={ref} className="relative flex w-10 h-10 -m-2 p-2">
      <button
        className={classNames(
          'absolute left-0 top-0 flex justify-center items-center w-full h-full hover:bg-gray-100',
        )}
        onClick={handleButtonClick}
      ></button>

      <div
        ref={menuRef}
        className={classNames(
          'fixed top-full z-30 min-w-52 max-w-52 flex-col py-1 bg-white rounded border shadow transform font-normal',
          isOpen ? 'flex' : 'hidden',
        )}
      >
        <div className="flex justify-between items-center pl-2 pr-1">
          <h3 className="text-sm leading-none text-gray-400">
            {studentName}
          </h3>
          <button
            className="border rounded p-1 text-danger"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <Icons.close width={10} height={10} />
          </button>
        </div>

        <hr className="my-1" />

        <RatingsCreateForm
          createDTO={createDTO}
          onSuccess={(rating) => {
            setRating(rating);
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default RatingCreate;
