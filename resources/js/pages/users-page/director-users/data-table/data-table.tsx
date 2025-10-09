import React, { BaseSyntheticEvent, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import ColumnFilter from './column-filter';
import ColumnVisibility from './column-visibility';
import {
  Column,
  ColumnDef,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortDirection,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    renderFilter?: (column: Column<TData, TValue>, setIsOpen: Dispatch<SetStateAction<boolean>>) => JSX.Element;
    renderHeader?: (column: Column<TData, TValue>) => JSX.Element;
    columnClass?: string;
    thClass?: string;
  }
};

const DEFAULT_PAGE_SIZE = 16;
const DEFAULT_SORTING_STATE: SortingState = [];
const DEFAULT_VISIBILITY_STATE: VisibilityState = {};
const DEFAULT_COLUMN_PINNING_STATE: ColumnPinningState = {
  left: [],
  right: [],
};

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  sortingState?: SortingState;
  visibilityState?: VisibilityState;
  columnPinningState?: ColumnPinningState;
  actions?: ReactNode;
  onExport?: (data: T[], columnVisibility: VisibilityState) => void;
  searchValue?: string;
  onSearchInput?: (evt: BaseSyntheticEvent) => void;
};

export default function DataTable<T>({
  data,
  columns,
  pageSize = DEFAULT_PAGE_SIZE,
  sortingState = DEFAULT_SORTING_STATE,
  visibilityState = DEFAULT_VISIBILITY_STATE,
  columnPinningState = DEFAULT_COLUMN_PINNING_STATE,
  actions,
  onExport,
  searchValue,
  onSearchInput,
}: DataTableProps<T>): JSX.Element {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });
  const [sorting, setSorting] = useState<SortingState>(sortingState);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(visibilityState);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(columnPinningState);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      maxSize: Number.MAX_SAFE_INTEGER,
      sortDescFirst: false,
      enableSorting: true,
      enableColumnFilter: false,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      pagination,
      columnPinning,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onColumnPinningChange: setColumnPinning,
  });

  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const getPaginationItems = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > delta + 2) pages.push('...');

      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - (delta + 1)) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const columnSizes = table.getHeaderGroups()[0].headers.map((header) => ({
    id: header.column.id,
    size: header.getSize()
  }));

  const getColumnPinningLeft = (columnId: string): object => {
    if (columnPinning.left) {
      const columnIndex = columnPinning.left.findIndex((id) => id === columnId);
      if (columnIndex && columnIndex < 0) return {};

      const left = columnPinning.left.reduce((acc, id, index) => {
        if (index < columnIndex) {
          acc += columnSizes.find((column) => column.id === id)?.size || 0;
        }

        return acc;
      }, 0);

      return {
        left: `${left}px`,
      };
    }

    return {};
  };

  const getColumnPinningRight = (columnId: string): object => {
    if (columnPinning.right) {
      const columnIndex = columnPinning.right.findIndex((id) => id === columnId);
      if (columnIndex && columnIndex < 0) return {};

      const right = columnPinning.right.reduce((acc, id, index) => {
        if (index < columnIndex) {
          acc += columnSizes.find((column) => column.id === id)?.size || 0;
        }

        return acc;
      }, 0);

      return {
        right: `${right}px`,
      };
    }

    return {};
  };

  const renderSortingIcon = (sortingType: false | SortDirection): ReactNode => {
    const Icon = Icons[sortingType === 'desc' ? 'arrowDownwardAlt' : 'arrowUpwardAlt'];
    return (
      <span
        className={classNames(
          'flex justify-center items-center min-w-6 min-h-6 rounded-full hover:bg-black/5',
          !sortingType && 'hidden opacity-40 group-hover:flex'
        )}
      >
        <Icon width={10} />
      </span>
    );
  };

  const handleSearchInput = (evt: BaseSyntheticEvent) => {
    if (onSearchInput) {
      onSearchInput(evt);
    } else {
      setGlobalFilter(evt.target.value);
    }
  };

  return (
    <div className="flex flex-col rounded-md shadow border bg-white overflow-scroll max-h-[calc(100vh-42px)] styled-scrollbar text-sm md:text-[16px] md:max-h-[calc(100vh-48px)]">
      <div className="sticky left-0 z-50 flex gap-2 p-1 border-b w-full">
        <ColumnVisibility
          table={table}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />

        <label className="flex grow items-center gap-1 h-7 cursor-pointer text-blue-700">
          <Icons.search width={14} />
          <input
            className="flex cursor-pointer focus:cursor-auto grow min-w-none w-full focus:outline-none placeholder:text-inherit focus:placeholder:font-normal focus:placeholder:text-gray-400"
            type="search"
            placeholder="Искать"
            value={searchValue || globalFilter}
            onInput={handleSearchInput}
          />
        </label>

        <div className="flex gap-1">
          {onExport && (
            <Button
              className="max-h-7"
              icon="fileExport"
              variant="light"
              onClick={() => onExport(data, columnVisibility)}
            >
              <span className="sr-only md:not-sr-only">Экспорт</span>
            </Button>
          )}
          {actions}
        </div>
      </div>

      <div className="sticky top-0 z-40 shadow min-w-max">
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="flex font-semibold min-h-7"
          >
            <div className="flex items-center justify-center px-1 min-w-8 max-w-8 bg-gray-100 md:px-2 md:min-w-10 md:max-w-10">
              №
            </div>
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className={classNames(
                  'flex items-center text-start bg-gray-100 cursor-pointer group border-gray-200 px-1 md:px-2',
                  columnPinning.left?.includes(header.column.id) && 'sticky z-10 border-r',
                  columnPinning.right?.includes(header.column.id) && 'sticky z-10 border-l',
                  header.column.columnDef.meta?.columnClass,
                )}
                onClick={(evt: BaseSyntheticEvent) => !evt.target.closest('.column-filter') && header.column.toggleSorting()}
                style={{
                  minWidth: `${header.getSize()}px`,
                  width: `${header.getSize()}px`,
                  maxWidth: `${header.getSize()}px`,
                  ...getColumnPinningLeft(header.column.id),
                  ...getColumnPinningRight(header.column.id),
                }}
              >
                {header.column.columnDef.meta?.renderHeader ? (
                  header.column.columnDef.meta?.renderHeader(header.column)
                ) : (
                  <span className="text-start truncate select-none">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </span>
                )}
                {header.column.getCanSort() && renderSortingIcon(header.column.getIsSorted())}

                <ColumnFilter
                  header={header}
                  columnPinning={columnPinning}
                  setColumnPinning={setColumnPinning}
                  setColumnVisibility={setColumnVisibility}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="min-w-max">
        {table.getRowModel().rows.map((row, index) => (
          <div
            key={JSON.stringify(row.original)}
            className={classNames(
              'flex',
              (index % 2) ? 'bg-gray-50' : 'bg-white',
            )}
          >
            <div
              className={classNames(
                'flex items-center justify-end p-1 min-w-8 max-w-8 md:p-2 md:min-w-10 md:max-w-10',
                (index % 2) ? 'bg-gray-50' : 'bg-white',
              )}
            >
              {(currentPage - 1) * pageSize + index + 1}.
            </div>

            {row.getVisibleCells().map((cell) => (
              <div
                key={JSON.stringify(cell)}
                className={classNames(
                  'flex items-center p-1 md:p-2',
                  (index % 2) ? 'bg-gray-50' : 'bg-white',
                  columnPinning.left?.includes(cell.column.id) && 'sticky left-0 z-10 border-r',
                  columnPinning.right?.includes(cell.column.id) && 'sticky right-0 z-10 border-l',
                  cell.column.columnDef.meta?.columnClass,
                )}
                style={{
                  minWidth: `${cell.column.getSize()}px`,
                  width: `${cell.column.getSize()}px`,
                  maxWidth: `${cell.column.getSize()}px`,
                  ...getColumnPinningLeft(cell.column.id),
                  ...getColumnPinningRight(cell.column.id),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 left-0 z-10 p-1 border-t bg-gray-100">
        <div className="flex w-max ml-auto">
          <button
            className="flex justify-center items-center h-7 w-7 border-transparent rounded-md border transform disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icons.previous width={7} />
          </button>

          {getPaginationItems().map((page, index) => (
            <button
              key={index}
              className={classNames(
                'flex justify-center items-center h-7 rounded-md border transform hover:font-bold',
                currentPage === page ? 'w-10 bg-white border-gray-200 pointer-events-none' : 'w-8 border-transparent',
                page === '...' ? 'pointer-events-none' : 'disabled:opacity-50 disabled:pointer-events-none',
              )}
              onClick={() => typeof page === 'number' && table.setPageIndex(page - 1)}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}

          <button
            className="flex justify-center items-center h-7 w-7 border-transparent rounded-md border transform disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icons.next width={7} />
          </button>
        </div>
      </div>
    </div>
  );
}
