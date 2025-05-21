import { useAppSelector } from '@/hooks';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { getSubjects } from '@/store/subjects-slice/subjects-selector';
import React, { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SelectField from './select-field';

function Header(): JSX.Element {
  const grades = useAppSelector(getGrades);
  const subjects = useAppSelector(getSubjects);
  const [searchParams] = useSearchParams();

  return (
    <header className="relative z-50 flex gap-x-1 gap-y-1 items-end">
      <h1 className="title">Журнал</h1>

      <SelectField
        className="min-w-10"
        placeholder="Класс"
        options={(grades || []).map((grade) => ({ value: grade.id.toString(), label: `${grade.level} ${grade.group}` }))}
        value={searchParams.get('gradeId') || ''}
      />

      <SelectField
        className="grow max-w-[320px]"
        placeholder="Предмет"
        options={(subjects || []).map((subject) => ({ value: subject.id.toString(), label: subject.name }))}
        value={searchParams.get('subjectId') || ''}
      />
    </header>
  );
}

export default memo(Header);
