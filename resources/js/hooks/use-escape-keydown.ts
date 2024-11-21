import { useEffect } from 'react';

export const useEscapeKeydown = (callback: () => void) => {
  useEffect(() => {
    const handleEscapeKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscapeKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeydown);
    };
  }, [callback]);
};
