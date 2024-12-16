import { useEffect, useRef, useState } from 'react';
import { useEscapeKeydown } from './use-escape-keydown';

export const useDropdown = <T extends HTMLElement,>() => {
  const
    ref = useRef<T>(null),
    menuRef = useRef<HTMLDivElement | null>(null),
    [isOpen, setIsOpen] = useState(false);

  useEscapeKeydown(() => setIsOpen(false));

  useEffect(() => {
    if (menuRef.current && ref.current) {
      const rect = menuRef.current.getBoundingClientRect();

      if (isOpen) {
        const top = window.innerHeight - rect.y;
        menuRef.current.style.top = `-${rect.height - top - ref.current.getBoundingClientRect().height + 16}px`;
      } else {
        menuRef.current.removeAttribute('style');
      }
    }

    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {

        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return { ref, menuRef, isOpen, setIsOpen };
};
