import api from "../api.js";
import { CONFIG } from "../config.js";
import { getFormData } from "./fields.js";

export function submitLecture(component) {
  component.addEventListener("submit", async (event) => {
    event.preventDefault();
    const lecture = getFormData();

    try {
      const response = await api.callAPI(
        "POST",
        `${CONFIG.API_BASE_URL}${CONFIG.LECTURES}`,
        lecture
      );

      chrome.runtime.sendMessage({
        type: "console",
        message: `RESPONSE DA API: ${response}`,
      });
    } catch (error) {
      chrome.runtime.sendMessage({
        type: "console",
        message: `Aula não pode ser criada: \n${error}`,
      });
      alert(`Falha ao criar aula`);
    }
  });
}
