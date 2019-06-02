export const enum LessonType {
  Seminar,
  Lecture,
  ModuleTest,
  Pretest,
  ExamConsulting, // ??
  Exam,
}

export interface Lesson {
  orderNumber: number;
  lessonEntry: string; // unparsed string
  room: string;
  isSubstitution: boolean;
  isSubstituted: boolean; // !isTrackable?
  groups: string[];
  subject: string;
  type: LessonType;
}

export interface WorkingDay {
  date: Date;
  lessons: Lesson[];
}

export interface Timetable {
  teacher: string;
  sdate: Date;
  edate: Date;
  workingDays: WorkingDay[];
}
