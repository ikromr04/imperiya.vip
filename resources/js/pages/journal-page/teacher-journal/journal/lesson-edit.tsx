import React, { useEffect, useRef } from 'react';
import { Icons } from '@/components/icons';
import { LessonUpdateDTO } from '@/dto/lessons';
import LessonsJournalEditForm from '@/components/forms/lessons/lessons-journal-edit-form';
import { Lesson } from '@/types/lessons';

export type LessonEditProps = {
  title: string;
  position: {
    top: number;
    left: number;
  };
  dto: LessonUpdateDTO;
  onClose: () => void;
  onSuccess: (updatedLesson: Lesson) => void;
}

function LessonEdit({
  title,
  position,
  dto,
  onClose,
  onSuccess,
}: LessonEditProps): JSX.Element {
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
      className="fixed flex z-30 min-w-52 max-w-52 flex-col py-1 bg-white rounded border shadow transform font-normal"
    >
      <div className="flex justify-between items-center pl-2 pr-1">
        <h3 className="text-sm leading-none text-gray-400">
          {title}
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

      <div className="px-2">
        <LessonsJournalEditForm
          dto={dto}
          onSuccess={(updatedLesson) => {
            onSuccess(updatedLesson);
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export default LessonEdit;
