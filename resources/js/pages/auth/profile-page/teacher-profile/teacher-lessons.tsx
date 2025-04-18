import React from 'react';
import Layout from './layout';
import TeacherLessonsTable from '@/components/lessons-table/teacher-lessons-table';

function TeacherLessons(): JSX.Element {
  return (
    <Layout>
      <TeacherLessonsTable />
    </Layout>
  );
}

export default TeacherLessons;
