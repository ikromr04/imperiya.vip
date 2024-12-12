import React, { BaseSyntheticEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { PropsWithClassname } from '../types';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import Button from './ui/button';
import { Icons } from './icons';

const DEFAULT_COLUMN_WIDTH = 200;

export type DataTableRow = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type DataTableRows = DataTableRow[];

export type DataTableColumn = {
  accessor: string;
  header: ReactNode;
  width?: number;
};

export type DataTableColumns = DataTableColumn[]

type DataTableProps = PropsWithClassname<{
  records: DataTableRows;
  columns: DataTableColumns;
  recordsPerPage?: number;
}>;

export default function DataTable({
  className,
  columns,
  records,
  recordsPerPage = 16,
}: DataTableProps): JSX.Element {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(recordsPerPage);
  const from = (page - 1) * perPage;
  const to = (page * perPage) > records.length ? records.length : (page * perPage);
  const paginatedData = records.slice(from, to);

  useEffect(() => {
    if (tableRef.current) {
      const decreaseHeight = (tableRef.current.parentElement?.previousElementSibling?.clientHeight || 0) + (tableRef.current.nextElementSibling?.clientHeight || 0);
      tableRef.current.style.maxHeight = `${(tableRef.current.parentElement?.parentElement?.clientHeight || 0) - decreaseHeight}px`;
    }
  }, []);

  return (
    <div className={classNames(className, 'relative z-0 flex flex-col max-h-full')}>
      <p className="pb-1">Отображение {from || 1} - {to} из {records.length}</p>

      <div className="relative overflow-hidden rounded shadow bg-white border">
        <table ref={tableRef} className="flex flex-col overflow-scroll scrollbar">
          <thead className="sticky top-0 z-10 flex min-w-max border-b">
            <tr className="flex font-semibold text-left min-w-max">
              <th
                className="flex items-center p-2 bg-gray-100 w-9"
              >
                №
              </th>
              {columns.map((column) => (
                <th
                  key={nanoid()}
                  className="flex items-center p-2 bg-gray-100"
                  style={{
                    minWidth: column.width || DEFAULT_COLUMN_WIDTH,
                    maxWidth: column.width || DEFAULT_COLUMN_WIDTH,
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="flex flex-col">
            {paginatedData.map((record, index) => (
              <tr key={nanoid()} className="flex min-w-max">
                <td
                  className={classNames('flex items-center p-2 text-left w-9', (index % 2 === 1) && 'bg-gray-50')}
                >
                  {from + index + 1}.
                </td>
                {columns.map((column) => (
                  <td
                    key={nanoid()}
                    className={classNames('flex items-center p-2 text-left', (index % 2 === 1) && 'bg-gray-50')}
                    style={{
                      minWidth: column.width || DEFAULT_COLUMN_WIDTH,
                      maxWidth: column.width || DEFAULT_COLUMN_WIDTH,
                    }}
                  >
                    {record[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-2 flex-wrap w-full p-2 bg-gray-100 border-t">
          <label className="flex items-center w-max gap-2">
            Строк на странице
            <input
              className="flex leading-none border min-w-0 w-[46px] h-8 rounded text-center"
              type="number"
              value={perPage}
              onInput={(evt: BaseSyntheticEvent) => setPerPage(evt.target.value)}
            />
          </label>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              className={classNames(page < 2 && 'pointer-events-none shadow-none opacity-60')}
              onClick={() => setPage((prevPage) => prevPage - 1)}
              disabled={page < 2}
              variant="light"
            >
              <Icons.previous width={14} height={14} />
              <span className="sr-only">Предыдущий</span>
            </Button>
            <Button
              className={classNames(page >= (records.length / perPage) && 'pointer-events-none shadow-none opacity-60')}
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={page >= (records.length / perPage)}
              variant="light"
            >
              <Icons.next width={14} height={14} />
              <span className="sr-only">Следующий</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
