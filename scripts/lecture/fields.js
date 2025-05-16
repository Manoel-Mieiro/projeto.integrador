export function fillTeacher() {
  chrome.storage.session.get("user", (result) => {
    const teacher = result.user;
    chrome.runtime.sendMessage({
      type: "console",
      message: `PROFESSOR resgatado: ${teacher}`,
    });

    document.getElementById("teacher").value = teacher;
  });
}

export function getFormData() {
  const formData = {
    subject: document.getElementById("subject").value,
    date_lecture: document.getElementById("date_lecture").value,
    period_start: document.getElementById("period_start").value,
    period_end: document.getElementById("period_end").value,
    teacher: document.getElementById("teacher").value,
  };

  chrome.runtime.sendMessage({
    type: "console",
    message: `Form data collected: ${JSON.stringify(formData)}`,
  });

  return formData;
}
