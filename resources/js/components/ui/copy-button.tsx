import Button from '@/components/ui/button';
import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';

type CopyButtonProps = {
  className?: string;
  string: string;
  children: ReactNode;
};

function CopyButton({
  className,
  string,
  children,
}: CopyButtonProps): ReactNode {
  const [isCopied, setIsCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(string);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Failed to copy: ', err);
    }
  };

  return (
    <Button
      className={classNames(
        className,
        isCopied && 'text-success',
      )}
      icon={isCopied ? 'checked' : 'copy'}
      variant="light"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CopyButton;
