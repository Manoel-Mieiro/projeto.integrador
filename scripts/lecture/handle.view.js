import { triggerCopy } from "./clipboard.js";

export function handleView() {
    chrome.runtime.sendMessage({
    type: "console",
    message: `Caí em handleView`,
  });
  const copyCard = document.getElementById("lecture_title");
  const lectureCard = document.getElementById("form_lecture");
  if (copyCard.style.display === "none") {
    const copyBtn = document.getElementById("copy");
    lectureCard.style.display = "none";
    copyCard.style.display = "block";
    triggerCopy(copyBtn);
  } else if (lectureCard.style.display === "none") {
    lectureCard.style.display = "block";
    copyCard.style.display = "none";
  }
}

export function triggerViewHandling(button) {
    chrome.runtime.sendMessage({
    type: "console",
    message: `Caí em triggerViewHandling`,
  });
  button.addEventListener("click", () => {
    handleView();
  });
}
