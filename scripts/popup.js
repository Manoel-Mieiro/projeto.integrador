import record from "./record.js";
import button from "./button.js";

window.addEventListener("DOMContentLoaded", () => {
  let btn = document.querySelector(".action-button");

  if (!btn) {
    chrome.runtime.sendMessage({
      type: "console",
      message: "Botão não encontrado.",
    });
    return;
  }

  chrome.runtime.sendMessage({
    type: "console",
    message: `Botão tem id ${btn.id}`,
  });

  localStorage.setItem("buttonId", btn.id);

  chrome.runtime.sendMessage({
    type: "console",
    message: "Salvando botão no local storage...",
  });

  btn.addEventListener("click", () => {
    button.updateButton(btn);
    if (btn.id === "stop") {
      record.recordTab();
      record.startRecord();
    } else {
      record.stopRecording();
    }
  });
});
