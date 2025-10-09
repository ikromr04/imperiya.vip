import React, { useEffect, useRef } from 'react';
import { Rating } from '@/types/ratings';
import { Icons } from '@/components/icons';
import RatingsEditForm from '@/components/forms/ratings/ratings-edit-form';
import { RatingUpdateDTO } from '@/dto/ratings';

export type RatingEditProps = {
  studentName: string;
  position: {
    top: number;
    left: number;
  };
  dto: RatingUpdateDTO;
  onClose: () => void;
  onSuccess: (updatedRating: Rating) => void;
}

function RatingEdit({
  studentName,
  position,
  dto,
  onClose,
  onSuccess,
}: RatingEditProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${position.top}px`;
      ref.current.style.left = `${position.left}px`;

      const menuRect = ref.current.getBoundingClientRect();
      if (menuRect.right > window.innerWidth) {
        ref.current.style.transform = `translateX(-${menuRect.right - window.innerWidth + 32}px)`;
      }
      if (menuRect.bottom > window.innerHeight) {
        ref.current.style.top = 'auto';
        ref.current.style.bottom = '16px';
      }
    }

    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, position.left, position.top]);

  return (
    <div
      ref={ref}
      className="fixed left z-30 min-w-52 max-w-52 flex-col py-1 bg-white rounded border shadow transform font-normal"
    >
      <div className="flex justify-between items-center pl-2 pr-1">
        <h3 className="text-sm leading-none text-gray-400">
          {studentName}
        </h3>
        <button
          className="border rounded p-1 text-danger"
          type="button"
          onClick={onClose}
        >
          <Icons.close width={10} height={10} />
        </button>
      </div>

      <hr className="my-1" />

      <RatingsEditForm
        dto={dto}
        onSuccess={(updatedRating) => {
          onSuccess(updatedRating);
          onClose();
        }}
      />
    </div>
  );
}

export default RatingEdit;
