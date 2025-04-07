import Button from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { updateRegisterLinkAction } from '@/store/auth-slice/auth-api-actions';
import { RegisterLinkId } from '@/types/auth';
import React, { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

type UpdateButtonProps = {
  id: RegisterLinkId;
};

function UpdateButton({
  id,
}: UpdateButtonProps): ReactNode {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const onClick = () => {
    setIsUpdating(true);

    dispatch(updateRegisterLinkAction({
      id,
      onSuccess: () => setIsUpdating(false),
      onFail: (message) => {
        toast.error(message);
        setIsUpdating(false);
      },
    }));
  };

  return (
    <Button
      icon="autorenew"
      variant="warning"
      onClick={onClick}
      disabled={isUpdating}
      loading={isUpdating}
    >
      <span className="sr-only">Обновить</span>
    </Button>
  );
}

export default UpdateButton;
