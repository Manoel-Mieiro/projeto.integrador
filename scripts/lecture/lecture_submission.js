import api from "../api.js";
import { CONFIG } from "../config.js";
import { initClipboardCopyListener } from "./clipboard.js";
import { getFormData } from "./fields.js";
import { handleView, restoreView, triggerViewHandling } from "./handle.view.js";
import { fillWithTitle } from "./lecture_title.js";

let clipboardData;
let lectureField;
let backBtn;

export async function submitLecture(component) {
  component.addEventListener("submit", async (event) => {
    event.preventDefault();
    lectureField = document.getElementById("lecture_content");
    backBtn = document.getElementById("back_lecture");
    clipboardData = getFormData();
    chrome.storage.session.set({ lecture: clipboardData });

    try {
      const response = await api.callAPI(
        "POST",
        `${CONFIG.API_BASE_URL}${CONFIG.LECTURES_ENDPOINT}`,
        clipboardData
      );
      handleView(clipboardData);
      fillWithTitle(clipboardData, lectureField);
      triggerViewHandling(backBtn);
    } catch (error) {
      chrome.runtime.sendMessage({
        type: "console",
        message: `Aula não pode ser criada: \n${error}`,
      });
      alert(`Falha ao criar aula`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initClipboardCopyListener();
  chrome.storage.session.get(["lecture"], (result) => {
    if (result.lecture) {
      clipboardData = result.lecture;
      lectureField = document.getElementById("lecture_content");
      backBtn = document.getElementById("back_lecture");

      restoreView();
      fillWithTitle(clipboardData, lectureField);
      triggerViewHandling(backBtn);

      chrome.runtime.sendMessage({
        type: "console",
        message: `DOMContentLoaded: ${clipboardData}`,
      });
    } else {
      chrome.runtime.sendMessage({
        type: "console",
        message: `DOMContentLoaded: Had no content`,
      });
    }
  });
});
