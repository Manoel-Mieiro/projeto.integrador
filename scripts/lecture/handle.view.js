import { triggerCopy } from "./clipboard.js";

export function handleView(content) {
  const copyCard = document.getElementById("lecture_title");
  const lectureCard = document.getElementById("form_lecture");
  const copyBtn = document.getElementById("copy");
  if (copyCard.style.display === "none") {
    lectureCard.style.display = "none";
    copyCard.style.display = "block";
    chrome.storage.session.set({ lectureView: "copy" });

    triggerCopy(copyBtn, content);
  } else if (lectureCard.style.display === "none") {
    lectureCard.style.display = "block";
    copyCard.style.display = "none";
    chrome.storage.session.remove("lectureView");
  }
}

export function triggerViewHandling(button) {
  button.addEventListener("click", () => {
    handleView();
  });
}

export function restoreView(content) {
  const copyCard = document.getElementById("lecture_title");
  const lectureCard = document.getElementById("form_lecture");
  const copyBtn = document.getElementById("copy");
  chrome.storage.session.get(["lectureView"], (result) => {
    if (result.lectureView === "copy") {
      chrome.runtime.sendMessage({
        type: "console",
        message: `lectureView: ${result.lectureView}`,
      });
      lectureCard.style.display = "none";
      copyCard.style.display = "block";
      triggerCopy(copyBtn, content);
    } else {
      chrome.runtime.sendMessage({
        type: "console",
        message: `lectureView: none`,
      });
      copyCard.style.display = "none";
      lectureCard.style.display = "block";
    }
  });
}
