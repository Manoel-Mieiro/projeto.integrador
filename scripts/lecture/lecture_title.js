function generateTitle(lecture) {
  var title = lecture;
  return JSON.stringify(title);
}

export function fillWithTitle(lecture, field) {
  field.textContent = generateTitle(lecture);
}
