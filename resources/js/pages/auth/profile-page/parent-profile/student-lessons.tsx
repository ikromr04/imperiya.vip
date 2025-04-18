import React from 'react';
import Layout from './layout';
import StudentLessonsTable from '@/components/lessons-table/student-lessons-table';

function StudentLessons(): JSX.Element {
  return (
    <Layout>
      <StudentLessonsTable />
    </Layout>
  );
}

export default StudentLessons;
