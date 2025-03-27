import React, { BaseSyntheticEvent, useState } from 'react';
import Button from './button';
import { User } from '@/types/users';
import classNames from 'classnames';
import { useDropdown } from '@/hooks/use-dropdown';
import { Icons } from '../icons';
import { useAppDispatch } from '@/hooks';
import { deleteUserAvatarAction, updateUserAvatarAction } from '@/store/users-slice/users-api-actions';
import Spinner from './spinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

type UserAvatarProps = {
  className?: string;
  user: User;
};

function UserAvatar({
  className,
  user,
}: UserAvatarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { ref, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateInputChange = async (evt: BaseSyntheticEvent) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('avatar', evt.target.files[0]);

    await dispatch(updateUserAvatarAction({
      formData,
      userId: user.id,
      onValidationError: (error) => toast.error(error.message),
      onFail: (message) => toast.error(message),
      onSuccess: () => setIsOpen(false),
    }));

    setIsLoading(false);
  };

  const handleDeleteButtonClick = async () => {
    setIsLoading(true);

    await dispatch(deleteUserAvatarAction({ userId: user.id }));

    setIsLoading(false);
  };

  return (
    <div ref={ref} className={classNames('relative z-10 w-36', className)}>
      <Button
        className="relative min-w-36 max-w-36 min-h-36 max-h-36 !p-0"
        variant="text"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="block w-full h-full rounded-full object-cover border-[2px] border-white"
          src={user.avatarThumb || '/images/avatar.png'}
          width={144}
          height={144}
          alt={user.name}
        />
        {isLoading && <Spinner className="absolute w-full h-full" />}
      </Button>

      <div
        className={classNames(
          'absolute top-full left-1/2 w-full border rounded-md py-1 bg-white shadow-sm text-sm min-w-max transform -translate-x-1/2 transition-all duration-150 text-gray-500',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <ul>
          <li>
            <label className="flex items-center gap-2 w-full h-8 transition-all duration-150 hover:bg-gray-100 px-3 cursor-pointer">
              <input
                className="sr-only"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleUpdateInputChange}
              />
              {user.avatarThumb ? <>
                <Icons.edit width={14} height={14} /> Изменить фото
              </> : <>
                <Icons.add width={14} height={14} /> Добавить фото
              </>}
            </label>
          </li>
          {user.avatarThumb && user.avatar && <>
            <li>
              <Link
                className="flex w-full gap-2 items-center h-8 transition-all duration-150 hover:bg-gray-100 px-3"
                to={user.avatar}
                target="_blank"
              >
                <Icons.visibility width={14} height={14} /> Просмотреть
              </Link>
            </li>
            <li>
              <button
                className="flex w-full gap-2 items-center h-8 transition-all duration-150 hover:bg-gray-100 px-3"
                type="button"
                onClick={handleDeleteButtonClick}
              >
                <Icons.delete width={14} height={14} /> Удалить фото
              </button>
            </li>
          </>}
        </ul>
      </div>
    </div>
  );
}

export default UserAvatar;
