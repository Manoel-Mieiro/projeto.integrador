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

    if (btn.id === "start") {
      await record.stopRecording();
    } else {
      await record.recordTabs();
    }
  });
});
