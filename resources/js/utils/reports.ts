import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { UserId } from '@/types/users';

type Student = {
  id: UserId;
  name: string;
  average: number;
  rounded: number;
};

type StudentCategory = Student[];

type ReportData = {
  classInfo: {
    class: string;
    totalStudents: number;
    girls: number;
    boys: number;
    excellent: { count: number; percent: number };
    good: { count: number; percent: number };
    average: { count: number; percent: number };
    poor: { count: number; percent: number };
    noGrades: { count: number; percent: number };
  };
  students: {
    excellent: StudentCategory;
    good: StudentCategory;
    average: StudentCategory;
    poor: StudentCategory;
    noGrades: StudentCategory;
  };
};

export const exportGradeReportToExcel = (data: ReportData): void => {
  const workbook = XLSX.utils.book_new();

  const classInfoSheet = XLSX.utils.json_to_sheet([
    { Параметр: 'Класс', Значение: data.classInfo.class },
    {
      Параметр: 'Количество учеников',
      Значение: `${data.classInfo.totalStudents} (девочек ${data.classInfo.girls} / мальчиков ${data.classInfo.boys})`,
    },
    { Параметр: 'Отличники', Значение: `${data.classInfo.excellent.count} (${data.classInfo.excellent.percent}%)` },
    { Параметр: 'Четвёрочники', Значение: `${data.classInfo.good.count} (${data.classInfo.good.percent}%)` },
    { Параметр: 'Троечники', Значение: `${data.classInfo.average.count} (${data.classInfo.average.percent}%)` },
    { Параметр: 'Двоечники', Значение: `${data.classInfo.poor.count} (${data.classInfo.poor.percent}%)` },
    { Параметр: 'Без оценок', Значение: `${data.classInfo.noGrades.count} (${data.classInfo.noGrades.percent}%)` },
  ]);
  XLSX.utils.book_append_sheet(workbook, classInfoSheet, 'Общая информация');

  const categoryMap: Record<keyof ReportData['students'], string> = {
    excellent: 'Отличники',
    good: 'Четвёрочники',
    average: 'Троечники',
    poor: 'Двоечники',
    noGrades: 'Без оценок',
  };

  for (const [key, label] of Object.entries(categoryMap) as [keyof ReportData['students'], string][]) {
    const students = data.students[key];
    const sheetData = students.length
      ? students.map((s) => ({
          ФИО: s.name,
          'Средний балл': s.average,
          'Округлённая оценка': s.rounded,
        }))
      : [{ Сообщение: 'Нет учеников' }];

    const sheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, sheet, label);
  }

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${data.classInfo.class}_Класс_Отчет.xlsx`);
};
