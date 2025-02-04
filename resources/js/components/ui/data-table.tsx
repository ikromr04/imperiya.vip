import React, { BaseSyntheticEvent, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import Button from './button';
import { Icons } from '../icons';

const DEFAULT_COLUMN_WIDTH = 200;

export type DataTableRow = {
  id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type DataTableRows = DataTableRow[];

export type DataTableColumn = {
  className?: string;
  accessor: string;
  header: ReactNode;
  width?: number;
  hidden?: boolean;
};

export type DataTableColumns = DataTableColumn[]

type DataTableProps = {
  className?: string;
  records: DataTableRows;
  columns: DataTableColumns;
  recordsPerPage?: number;
};

export default function DataTable({
  className,
  columns,
  records,
  recordsPerPage = 16,
}: DataTableProps): JSX.Element {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(recordsPerPage);
  const from = (page - 1) * perPage;
  const to = (page * perPage) > records.length ? records.length : (page * perPage);
  const paginatedData = records.slice(from, to);

  useEffect(() => {
    setPage(1);
  }, [records]);

  const onPerPageChange = (evt: BaseSyntheticEvent) => {
    if (+evt.target.value > 50) {
      evt.target.value = 50;
    }
    setPerPage(evt.target.value);
    setPage(1);
  };

  return (
    <div className={classNames(className, 'relative z-0 flex flex-col')}>
      <p className="mb-2 leading-none min-w-max">Отображение {from || 1} - {to} из {records.length}</p>

      <div className="relative overflow-hidden rounded shadow bg-white border">
        <table className="flex flex-col h-[calc(100%-49px)] overflow-auto scrollbar text-sm leading-[1.2]">
          <thead className="sticky top-0 z-10 flex min-w-max border-b">
            <tr className="flex font-semibold text-left bg-gray-100 p-2 gap-1 w-full">
              <th className="flex items-center min-w-8 font-semibold">
                №
              </th>
              {columns.map((column) => {
                if (!column.hidden) {
                  return (
                    <th
                      key={column.accessor}
                      className={classNames(
                        'flex items-center font-semibold',
                        column.className,
                      )}
                      style={{
                        minWidth: column.width || DEFAULT_COLUMN_WIDTH,
                        maxWidth: column.width || DEFAULT_COLUMN_WIDTH,
                      }}
                    >
                      {column.header}
                    </th>
                  );
                }
                return null;
              })}
            </tr>
          </thead>

          <tbody className="flex flex-col">
            {paginatedData.map((record, index) => (
              <tr key={record.id} className={classNames('flex gap-1 px-2 py-1', (index % 2 === 1) && 'bg-gray-50')}>
                <td className="flex items-center text-left min-w-8">
                  {from + index + 1}
                </td>
                {columns.map((column) => {
                  if (!column.hidden) {
                    return (
                      <td
                        key={column.accessor}
                        className={classNames(
                          'flex items-center text-left break-word',
                          column.className,
                        )}
                        style={{
                          minWidth: column.width || DEFAULT_COLUMN_WIDTH,
                          maxWidth: column.width || DEFAULT_COLUMN_WIDTH,
                        }}
                      >
                        {record[column.accessor]}
                      </td>
                    );
                  }
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-2 flex-wrap w-full p-2 bg-gray-100 border-t">
          <label className="flex items-center w-max gap-2">
            Строк
            <input
              className="flex leading-none border min-w-0 w-[46px] h-8 rounded text-center"
              type="number"
              value={perPage}
              onInput={onPerPageChange}
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
