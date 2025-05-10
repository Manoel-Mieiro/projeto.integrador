from app.models.lecture import Lecture

class LectureDTO:
    def __init__(self, subject: str, date_lecture: str, period_start: str, period_end: str, teacher: str):
        if (subject is None or len(subject) == 0) or date_lecture is None or period_start is None or period_end is None or (teacher is None or len(teacher) == 0):
            raise ValueError("All fields are required")
        self.subject = subject
        self.date_lecture = date_lecture
        self.period_start = period_start
        self.period_end = period_end
        self.teacher = teacher

    def to_standard(self):
        return Lecture(
            subject=self.subject,
            date_lecture=self.date_lecture,
            period_start=self.period_start,
            period_end=self.period_end,
            teacher=self.teacher
        )
