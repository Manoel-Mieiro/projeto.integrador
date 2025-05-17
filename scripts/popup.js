import record from "./record.js";
import button from "./button.js";

document.addEventListener("DOMContentLoaded", async () => {
  const btn = document.getElementById("start");
  const exit = document.getElementById("exit");

  if (!btn) {
    console.error("Botão não encontrado");
    return;
  }

  await chrome.storage.session.set({ recording: false });

  btn.addEventListener("click", async () => {
    const state = await chrome.storage.session.get(["recording"]);
    const isRecording = state.recording === true;

    await chrome.storage.session.set({
      recording: !isRecording,
      lectureLink: document.getElementById("lecture_link").value,
    });

    await button.updateButton(btn);

    if (isRecording) {
      await record.stopRecording();
    } else {
      await record.recordTabs();
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
