import { Icons } from '@/components/icons';
import { useDropdown } from '@/hooks/use-dropdown';
import { Table, VisibilityState } from '@tanstack/react-table';
import classNames from 'classnames';
import React, { BaseSyntheticEvent, Dispatch, ReactNode, SetStateAction } from 'react';

type ColumnVisibilityProps<T> = {
  table: Table<T>;
  columnVisibility: VisibilityState;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
};

function ColumnVisibility<T>({
  table,
  columnVisibility,
  setColumnVisibility,
}: ColumnVisibilityProps<T>): JSX.Element {
  const { ref, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();

  const columns = table.getAllColumns().map((column) => ({
    id: column.columnDef.id,
    header: column.columnDef.header,
  }));

  const handleInputChange = (columnId: string) => (evt: BaseSyntheticEvent) => {
    if (evt.target.checked) {
      setColumnVisibility((prev) => ({
        ...prev,
        [columnId]: true,
      }));
    } else {
      setColumnVisibility((prev) => ({
        ...prev,
        [columnId]: false,
      }));
    }
  };

  return (
    <div
      ref={ref}
      className="relative z-30"
    >
      <button
        className="flex items-center gap-2 h-8 text-blue-700"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.viewColumn width={16} />
        <span className="sr-only md:not-sr-only">Столбцы</span>
      </button>

      <div
        className={classNames(
          'absolute left-0 top-full bg-white py-1 border rounded shadow max-h-[240px] overflow-y-auto overflow-x-hidden styled-scrollbar',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        {columns.map((column) => (
          <label
            key={column.id}
            className="flex items-center gap-2 min-w-max pl-3 pr-5 h-8 transition-all duration-150 hover:bg-gray-100 cursor-pointer"
          >
            <input
              type="checkbox"
              onChange={handleInputChange(column.id as string)}
              checked={columnVisibility[column.id as string] === undefined ? true : columnVisibility[column.id as string]}
            />
            {column.header as ReactNode}
          </label>
        ))}
      </div>
    </div>
  );
}

export default ColumnVisibility;
