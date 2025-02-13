import React from 'react';
import DataTable, { DataTableColumns } from '../ui/data-table';
import { Grades } from '@/types/grades';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';

type GradesTableProps = {
  className?: string;
  grades: Grades;
};

function GradesTable({
  className,
  grades,
}: GradesTableProps): JSX.Element {
  const columns: DataTableColumns = [
    {
      accessor: 'name',
      header: 'Название',
      width: 80,
    },
    {
      accessor: 'students',
      header: 'Ученики',
      width: 1200,
      className: '!min-w-none !max-w-none'
    },
  ];

  const records = grades.map((grade) => ({
    id: grade.id,
    name:
      <Link className="text-lg font-semibold" to={generatePath(AppRoute.Classes.Show, { classId: grade.id })}>
        {grade.level} <sup>"</sup>{grade.group}<sup>"</sup>
      </Link>,
    students:
      <div className="flex flex-wrap gap-1 p-1">
        {grade.students?.map(({ user }) => (
          <Link key={user.id} className="py-1 px-2 border rounded bg-gray-100 hover:bg-blue-50" to={generatePath(AppRoute.Users.Show, { userId: user.id })}>
            {user.name}
          </Link>
        ))}
      </div>
  }));

  return (
    <DataTable
      className={className}
      records={records}
      columns={columns}
    />
  );
}

export default GradesTable;
