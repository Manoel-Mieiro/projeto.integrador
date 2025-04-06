import record from "./record.js";
import button from "./button.js";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("start");

  if (!btn) {
    console.error("Botão não encontrado");
    return;
  }

  const savedId = localStorage.getItem("buttonId");
  if (savedId) {
    btn.id = savedId;
    btn.textContent = savedId === "start" ? "START" : "STOP";
  }

  btn.addEventListener("click", async () => {
    button.updateButton(btn);

    const isRecording = btn.id !== "start";

    await chrome.storage.local.set({ recording: isRecording });

    if (!isRecording) {
      await record.stopRecording();
    } else {
      await record.recordTabs();
    }
  });
});
