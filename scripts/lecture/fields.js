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
