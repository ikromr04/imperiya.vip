import { Icons } from '@/components/icons';
import { useDropdown } from '@/hooks/use-dropdown';
import { ColumnPinningState, flexRender, Header, VisibilityState } from '@tanstack/react-table';
import classNames from 'classnames';
import React, { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';

type ColumnFilterProps<TData, TValue> = {
  header: Header<TData, TValue>;
  columnPinning: ColumnPinningState;
  setColumnPinning: Dispatch<SetStateAction<ColumnPinningState>>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
};

function ColumnFilter<TData, TValue>({
  header,
  columnPinning,
  setColumnPinning,
  setColumnVisibility,
}: ColumnFilterProps<TData, TValue>): JSX.Element {
  const { ref, isOpen, setIsOpen, menuRef } = useDropdown<HTMLDivElement>();

  const handleButtonClick = async () => {
    if (ref.current && menuRef.current) {
      await setIsOpen(!isOpen);
      const containerRect = ref.current.getBoundingClientRect();

      menuRef.current.style.top = `${containerRect.top + containerRect.height + 12}px`;
      menuRef.current.style.left = `${containerRect.left + containerRect.width}px`;
      const menuRect = menuRef.current.getBoundingClientRect();
      if (menuRect.right > window.innerWidth) {
        menuRef.current.style.transform = `translateX(-${menuRect.right - window.innerWidth + 32}px)`;
      }
    }
  };

  return (
    <div ref={ref} className="relative ml-auto column-filter">
      <button
        className={classNames(
          'justify-center items-center min-w-6 min-h-6 rounded-full bg-gray-100 hover:bg-gray-200',
          (columnPinning.left?.includes(header.column.id) || columnPinning.right?.includes(header.column.id) || header.column.getCanFilter())
            ? 'flex text-error' : 'hidden group-hover:flex'
        )}
        onClick={handleButtonClick}
      >
        <Icons.moreVert width={3} />
      </button>

      <div
        ref={menuRef}
        className={classNames(
          'fixed top-full z-30 min-w-max flex-col py-1 bg-white rounded border shadow transform font-normal',
          isOpen ? 'flex' : 'hidden'
        )}
        onClick={(evt: BaseSyntheticEvent) => !evt.target.closest('.column-filter-header') && setIsOpen(false)}
      >
        <div className="flex flex-col column-filter-header px-3 py-1">
          <h3 className="text-sm leading-none text-gray-400 mb-1">
            {flexRender(header.column.columnDef.header, header.getContext())}
          </h3>
          {header.column.columnDef.meta?.renderFilter?.(header.column)}
        </div>

        <hr className="my-1" />

        {!columnPinning.left?.includes(header.column.id) && (
          <button
            className="flex items-center gap-2 pl-3 pr-4 py-1 transition-all duration-150 hover:bg-gray-100"
            type="button"
            onClick={() =>
              setColumnPinning((prev) => ({
                left: prev.left && (prev.left.includes(header.column.id) ? [...prev.left] : [...prev.left, header.column.id]),
                right: prev.right?.filter((col) => col !== header.column.id),
              }))
            }
          >
            <span className="flex items-center justify-center w-4 h-4">
              <Icons.keep className="transform rotate-[30deg]" width={10} />
            </span>
            Закрепить слева
          </button>
        )}
        {!columnPinning.right?.includes(header.column.id) && (
          <button
            className="flex items-center gap-2 pl-3 pr-4 py-1 transition-all duration-150 hover:bg-gray-100"
            type="button"
            onClick={() =>
              setColumnPinning((prev) => ({
                left: prev.left?.filter((col) => col !== header.column.id),
                right: prev.right && (prev.right.includes(header.column.id) ? [...prev.right] : [...prev.right, header.column.id]),
              }))
            }
          >
            <span className="flex items-center justify-center w-4 h-4">
              <Icons.keep className="transform -rotate-[30deg]" width={10} />
            </span>
            Закрепить справа
          </button>
        )}
        {(columnPinning.right?.includes(header.column.id) || columnPinning.left?.includes(header.column.id)) && (
          <button
            className="flex items-center gap-2 pl-3 pr-4 py-1 transition-all duration-150 hover:bg-gray-100"
            type="button"
            onClick={() =>
              setColumnPinning((prev) => ({
                left: prev.left?.filter((col) => col !== header.column.id),
                right: prev.right?.filter((col) => col !== header.column.id),
              }))
            }
          >
            <span className="flex items-center justify-center w-4 h-4">
              <Icons.keep className="opacity-0" width={10} />
            </span>
            Открепить
          </button>
        )}

        <hr className="my-1" />

        <button
          className="flex items-center gap-2 pl-3 pr-4 py-1 transition-all duration-150 hover:bg-gray-100"
          type="button"
          onClick={() => setColumnVisibility((prev) => ({
            ...prev,
            [header.column.id]: false,
          }))}
        >
          <span className="flex items-center justify-center w-4 h-4">
            <Icons.visibilityOff width={16} />
          </span>
          Скрыть столбец
        </button>
      </div>
    </div>
  );
}

export default ColumnFilter;
