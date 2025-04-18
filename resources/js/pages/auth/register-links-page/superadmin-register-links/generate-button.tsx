import Button from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { generateRegisterLinkAction } from '@/store/auth-slice/auth-api-actions';
import React, { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

function GenerateButton(): ReactNode {
  const dispatch = useAppDispatch();
  const [isGenerating, setIsGenerating] = useState(false);

  const onClick = () => {
    setIsGenerating(true);

    dispatch(generateRegisterLinkAction({
      onSuccess: () => setIsGenerating(false),
      onFail: (message) => {
        toast.error(message);
        setIsGenerating(false);
      },
    }));
  };

  return (
    <Button
      icon="add"
      variant="success"
      onClick={onClick}
      disabled={isGenerating}
      loading={isGenerating}
    >
      <span className="sr-only md:not-sr-only">Сгенерировать</span>
    </Button>
  );
}

export default GenerateButton;
