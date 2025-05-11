import api from "../api.js";
import { CONFIG } from "../config.js";
import { getFormData } from "./fields.js";
import { triggerViewHandling } from "./handle.view.js";
import { fillWithTitle } from "./lecture_title.js";

export async function submitLecture(component) {
  component.addEventListener("submit", async (event) => {
    event.preventDefault();
    const lecture = getFormData();
    const lectureField = document.getElementById("lecture_content");
    const backBtn = document.getElementById("back_lecture");

    try {
      const response = await api.callAPI(
        "POST",
        `${CONFIG.API_BASE_URL}${CONFIG.LECTURES_ENDPOINT}`,
        lecture
      );
      fillWithTitle(lecture, lectureField);
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
