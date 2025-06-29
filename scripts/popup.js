import record from "./record.js";
import button from "./button.js";

document.addEventListener("DOMContentLoaded", async () => {
  const btn = document.getElementById("start");
  const exit = document.getElementById("exit");

  if (!btn) {
    console.error("Botão não encontrado");
    return;
  }

  const hasState = await chrome.storage.session.get(["recording"]);
  if (hasState.recording === undefined) {
    await chrome.storage.session.set({ recording: false });
  }

  // atualiza view do botão no reload
  await button.updateButton(btn);

  btn.addEventListener("click", async () => {
    const state = await chrome.storage.session.get(["recording"]);
    const isRecording = state.recording === true;

    const [tab] = await record.getTab();
    const lecture = document.getElementById("lecture_link").value;

    if (!lecture) {
      chrome.runtime.sendMessage({
        type: "console",
        message: "ERRO: o link da reunião está vazio.",
      });
      alert("Por favor, insira o Link da reunião");
      return;
    } else {
      await record.startLecture(tab, lecture);
    }
  });

  exit?.addEventListener("click", () => {
    chrome.storage.session.clear(() => {
      const error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
      window.location.href = "redirect.html";
    });
  });
});
