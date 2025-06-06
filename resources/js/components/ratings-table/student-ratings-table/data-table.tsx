import React, {  memo, ReactNode, useState } from 'react';
import { ColumnDef, ColumnPinningState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';
import { Column } from './student-ratings-table';
import { RatingSlugToText } from '@/const/ratings';
import { RatingSlug } from '@/types/ratings';

type DataTableProps = {
  data: Column[];
  columns: ColumnDef<Column>[];
}

function DataTable({
  data,
  columns,
}: DataTableProps): ReactNode {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['name'],
    right: [],
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning,
    },
    onColumnPinningChange: setColumnPinning,
  });

  return (
    <div className="flex flex-col rounded-md shadow border bg-white overflow-scroll max-h-[calc(100vh-52px)] styled-scrollbar text-sm md:text-[16px]">
      <div className="sticky top-0 z-40 shadow min-w-max">
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="flex"
          >
            <div className="flex items-end leading-none justify-end p-1 min-w-7 max-w-7 font-semibold bg-gray-100 md:p-2 md:min-w-9 md:max-w-9">
              №
            </div>
            {headerGroup.headers.map((header) => {
              if (header.id === 'name') {
                return (
                  <div
                    key={header.id}
                    className="flex items-end bg-gray-100 p-1 md:p-2 leading-none font-semibold min-w-[180px] max-w-[180px)] md:min-w-[220px] md:max-w-[220px] min-h-20 max-h-20 sticky left-0 z-10 border-r"
                  >
                    Предмет
                  </div>
                );
              }

              return (
                <div
                  key={header.id}
                  className="relative flex bg-gray-100 min-w-9 max-w-9 min-h-[80px] max-h-[80px] border-r text-[13px]"
                >
                  <span className="absolute left-full bottom-0 flex items-center justify-start px-1 origin-bottom-left -rotate-90 h-9 w-[80px] text-blue-600">
                    {RatingSlugToText[header.id as RatingSlug]}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="min-w-max">
        {table.getRowModel().rows.map((row, index) => (
          <div
            key={row.original.id}
            className={classNames(
              'flex',
              (index % 2) ? 'bg-gray-50' : 'bg-white',
            )}
          >
            <div
              className={classNames(
                'flex items-center justify-end p-1 min-w-7 max-w-7 min-h-9 max-h-9 md:p-2 md:min-w-9 md:max-w-9',
                (index % 2) ? 'bg-gray-50' : 'bg-white',
              )}
            >
              {index + 1}.
            </div>
            {row.getVisibleCells().map((cell, columnIndex) => (
              <div
                key={JSON.stringify(cell)}
                className={classNames(
                  columnIndex === 0 && 'sticky left-0 border-r',
                  (index % 2) ? 'bg-gray-50 border-r' : 'bg-white border-r',
                  cell.column.columnDef.meta?.columnClass,
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(DataTable);
