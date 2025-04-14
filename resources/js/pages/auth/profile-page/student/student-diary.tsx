import React from 'react';
import Layout from './layout';
import DiaryTable from '@/components/diary-table/diary-table';

function StudentDiary(): JSX.Element {
  return (
    <Layout>
      <DiaryTable />
    </Layout>
  );
}

export default StudentDiary;
