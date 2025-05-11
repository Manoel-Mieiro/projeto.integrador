import { triggerCopy } from "./clipboard.js";

export function handleView() {
  const copyCard = document.getElementById("lecture_title");
  const lectureCard = document.getElementById("form_lecture");
  const copyBtn = document.getElementById("copy");
  const lectureContent = document.getElementById("lecture_content");

  if (copyCard.style.display === "none") {
    lectureCard.style.display = "none";
    copyCard.style.display = "block";

    triggerCopy(copyBtn, lectureContent);
  } else if (lectureCard.style.display === "none") {
    lectureCard.style.display = "block";
    copyCard.style.display = "none";
  }
}

export function triggerViewHandling(button) {
  button.addEventListener("click", () => {
    handleView();
  });
}
