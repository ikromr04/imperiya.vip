import { useEffect, useRef, useState } from 'react';
import { useEscapeKeydown } from './use-escape-keydown';

export const useDropdown = <T extends HTMLElement>() => {
  const
    ref = useRef<T>(null),
    [isOpen, setIsOpen] = useState(false);

  useEscapeKeydown(() => setIsOpen(false));

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { ref, isOpen, setIsOpen };
};
