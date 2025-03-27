import classNames from 'classnames';
import React, { BaseSyntheticEvent, PropsWithChildren } from 'react';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
}>;

export default function Modal({
  children,
  isOpen,
}: ModalProps): JSX.Element {
  const handleModalClick = (evt: BaseSyntheticEvent) => {
    if (evt.target === evt.currentTarget) {
      evt.target.children[0].classList.add('shake');
      setTimeout(() => {
        evt.target.children[0].classList.remove('shake');
      }, 300);
    }
  };

  return (
    <div
      className={classNames(
        'fixed left-0 top-0 z-50 flex justify-center w-screen h-screen backdrop-blur-[2px] bg-white transition-all duration-150 overflow-auto md:bg-black/30',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}
      onClick={handleModalClick}
    >
      <div className={classNames(
        'bg-white min-h-max h-max my-8 mx-[5vw] w-full md:max-w-[620px] transition-all duration-150 md:mx-0 md:my-16 md:py-4 md:px-8 md:rounded-md md:shadow-md',
        isOpen ? 'translate-y-0' : '-translate-y-[100vh]',
      )}>
        {children}
      </div>
    </div>
  );
}
