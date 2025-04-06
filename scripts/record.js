import api from "./api.js";
import tabs from "./tab.js";

const target = "https://teams.microsoft.com/v2/";

async function stopRecording() {
  chrome.runtime.sendMessage({
    type: "console",
    message: "User stopped recording",
  });
}

async function recordTab() {
  let [tab] = await tabs.getTab();

  const payload = tabs.buildPayload(tab, target);

  chrome.runtime.sendMessage({
    type: "tabData",
    payload: payload,
  });

  api.CallAPI("POST", "http://localhost:3312/demo", payload);
}

function startRecord() {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      chrome.runtime.sendMessage({
        type: "console",
        message: "User switched tab or minimized window",
      });
      recordTab();
    }
  });
}

export default { startRecord, stopRecording, recordTab };
