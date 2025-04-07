import Button from '@/components/ui/button';
import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';

type CopyButtonProps = {
  link: string;
};

function CopyButton({
  link,
}: CopyButtonProps): ReactNode {
  const [isCopied, setIsCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Failed to copy: ', err);
    }
  };

  return (
    <Button
      className={classNames(isCopied && 'text-success')}
      icon={isCopied ? 'checked' : 'copy'}
      variant="light"
      onClick={onClick}
    >
      <span className="sr-only">Скопировать ссылку</span>
    </Button>
  );
}

export default CopyButton;
