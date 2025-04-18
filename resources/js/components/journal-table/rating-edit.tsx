import { useDropdown } from '@/hooks/use-dropdown';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Icons } from '../icons';
import { Rating } from '@/types/ratings';
import RatingsEditForm from '../forms/ratings/ratings-edit-form';

type RatingEditProps = {
  rating: Rating;
  studentName: string;
}

function RatingEdit(props: RatingEditProps): JSX.Element {
  const { ref, isOpen, setIsOpen, menuRef } = useDropdown<HTMLDivElement>();
  const [rating, setRating] = useState<Rating>(props.rating);

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
    }
  };

  return (
    <div ref={ref} className="relative flex w-10 h-10 -m-2 p-2">
      <button
        className={classNames(
          'absolute left-0 top-0 flex justify-center items-center w-full h-full hover:bg-gray-100',
        )}
        onClick={handleButtonClick}
      >
        {rating.score ?? ''}
      </button>

      <div
        ref={menuRef}
        className={classNames(
          'fixed top-full z-30 min-w-52 max-w-52 flex-col py-1 bg-white rounded border shadow transform font-normal',
          isOpen ? 'flex' : 'hidden',
        )}
      >
        <div className="flex justify-between items-center pl-2 pr-1">
          <h3 className="text-sm leading-none text-gray-400">
            {props.studentName}
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

        <RatingsEditForm
          rating={rating}
          onSuccess={(rating) => {
            setRating(rating);
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default RatingEdit;
