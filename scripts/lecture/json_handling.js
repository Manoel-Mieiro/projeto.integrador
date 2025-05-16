export function formatLectureString(data) {
  const subject = data.subject?.toUpperCase();
  const date = data.date_lecture;
  const start = data.period_start;
  const end = data.period_end;
  const teacher = data.teacher;

  return `[${subject}] ${date}, ${start}-${end}: ${teacher}`;
}
