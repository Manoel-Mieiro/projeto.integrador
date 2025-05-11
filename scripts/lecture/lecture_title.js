import { handleView } from "./handle.view.js";

function generateTitle(lecture) {
  var title = lecture;
  return title;
}

export function fillWithTitle(lecture, field) {
  chrome.runtime.sendMessage({
    type: "console",
    message: `Caí em fillWithTitle`,
  });
  generateTitle(lecture);
  field.value = lecture;
  handleView();
}
