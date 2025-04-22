import React, { BaseSyntheticEvent, Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react';
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
import Button from '../button';

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
  className?: string;
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
  className,
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
  const tableRef = useRef<HTMLTableElement>(null);

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

  const scrollSync = (event: React.UIEvent<HTMLDivElement>) => {
    if (tableRef.current) {
      const { scrollLeft } = event.currentTarget;
      tableRef.current.querySelectorAll('.sync-scroll').forEach((element) => {
        element.scrollLeft = scrollLeft;
      });
    }
  };

  const handleSearchInput = (evt: BaseSyntheticEvent) => {
    if (onSearchInput) {
      onSearchInput(evt);
    } else {
      setGlobalFilter(evt.target.value);
    }
  };

  return (
    <div
      className={classNames(
        'rounded-md shadow border bg-white',
        className,
      )}
    >
      <div className="flex gap-4 p-2 pl-4 border-b relative z-50">
        <ColumnVisibility
          table={table}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />

        <label className="flex grow items-center gap-2 h-8 cursor-pointer text-blue-700">
          <Icons.search width={14} />
          <input
            className="flex cursor-pointer focus:cursor-auto grow min-w-none w-full focus:outline-none placeholder:text-inherit focus:placeholder:font-normal focus:placeholder:text-gray-400"
            type="search"
            placeholder="Искать"
            value={searchValue || globalFilter}
            onInput={handleSearchInput}
          />
        </label>

        <div className="flex gap-2">
          {onExport && (
            <Button
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

      <table ref={tableRef} className="flex flex-col w-full">
        <thead
          className="sticky top-0 z-40 shadow overflow-x-auto no-scrollbar sync-scroll"
          onScroll={scrollSync}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th
                className="relative p-2 min-w-10 w-10 max-w-10 text-start bg-gray-100 cursor-pointer group"
              >
                <span className="absolute left-0 top-0 w-full h-full flex items-end p-2">
                  №
                </span>
              </th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={classNames(
                    'p-0 text-start bg-gray-100 cursor-pointer group',
                    columnPinning.left?.includes(header.column.id) && 'sticky z-10',
                    columnPinning.right?.includes(header.column.id) && 'sticky z-10',
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
                  <div
                    className={classNames(
                      'flex p-2 border-gray-200',
                      columnPinning.left?.includes(header.column.id) && 'border-r',
                      columnPinning.right?.includes(header.column.id) && 'border-l',
                      header.column.columnDef.meta?.thClass,
                    )}
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
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody
          className="overflow-x-auto no-scrollbar sync-scroll"
          onScroll={scrollSync}
        >
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={JSON.stringify(row.original)}
              className={classNames(
                (index % 2) ? 'bg-gray-50' : 'bg-white',
              )}
            >
              <td
                className={classNames(
                  'relative p-2 min-w-10 w-10 max-w-10',
                  (index % 2) ? 'bg-gray-50' : 'bg-white',
                )}
              >
                {(currentPage - 1) * pageSize + index + 1}
              </td>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={JSON.stringify(cell)}
                  className={classNames(
                    'p-0',
                    (index % 2) ? 'bg-gray-50' : 'bg-white',
                    columnPinning.left?.includes(cell.column.id) && 'sticky left-0 z-10',
                    columnPinning.right?.includes(cell.column.id) && 'sticky right-0 z-10',
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
                  <div
                    className={classNames(
                      'p-2 h-full before:absolute before:top-0 before:w-[1px] before:h-full before:bg-transparent',
                      columnPinning.left?.includes(cell.column.id) && 'before:right-0 before:!bg-gray-200',
                      columnPinning.right?.includes(cell.column.id) && 'before:left-0 before:!bg-gray-200',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot
          className="sticky bottom-[48px] z-10 overflow-x-auto bg-white styled-scrollbar mb-[-1px] sync-scroll"
          onScroll={scrollSync}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <td
                className="border-t p-0 min-w-10 w-10 max-w-10"
              ></td>
              {headerGroup.headers.map((header) => (
                <td
                  className={classNames(
                    'border-t p-0',
                    header.column.columnDef.meta?.columnClass,
                  )}
                  key={header.id}
                  style={{
                    minWidth: header.getSize() ? `${header.getSize()}px` : 'auto',
                    width: header.getSize() ? `${header.getSize()}px` : 'auto',
                    maxWidth: header.getSize() ? `${header.getSize()}px` : 'auto',
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      <div className="sticky bottom-0 z-10 rounded-b-md p-2 border-t bg-gray-100">
        <div className="flex w-max ml-auto">
          <button
            className="flex justify-center items-center h-8 w-8 border-transparent rounded-md border transform disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icons.previous width={7} />
          </button>

          {getPaginationItems().map((page, index) => (
            <button
              key={index}
              className={classNames(
                'flex justify-center items-center h-8 rounded-md border transform hover:font-bold',
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
            className="flex justify-center items-center h-8 w-8 border-transparent rounded-md border transform disabled:opacity-50 disabled:pointer-events-none"
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
