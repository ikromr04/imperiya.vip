import React from 'react';
import Layout from './layout';
import DiaryTable from '@/components/diary-table/student-diary-table';

function StudentDiary(): JSX.Element {
  return (
    <Layout>
      <DiaryTable />
    </Layout>
  );
}

export default StudentDiary;
