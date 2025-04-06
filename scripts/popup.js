import api from "./api.js";
import button from "./button.js";

let actionButton = document.getElementById("start");

window.addEventListener("DOMContentLoaded", () => {
  const savedId = localStorage.getItem("buttonId");

  if (savedId) {
    actionButton.id = savedId;
    actionButton.textContent = savedId === "start" ? "START" : "STOP";
  }
});

actionButton.addEventListener("click", () => {
  if (actionButton.id === "start") {
    RecordTabs();
  } else {
    StopRecording();
  }
});

async function StopRecording() {
  button.updateButton(actionButton);

  chrome.runtime.sendMessage({
    type: "console",
    message: "User stopped recording",
  });

  const payload = {
    user: "dummy",
    action: "stop",
    timestamp: Date.now(),
    lastTab: await GetTab(),
  };

  api.CallAPI("POST", "http://localhost:3312/demo", payload);
}

async function RecordTabs() {
  button.updateButton(actionButton);

  let [tab] = await GetTab();

  const payload = {
    url: tab.url,
    title: tab.title,
    muted: tab.mutedInfo.muted,
    lastAccessed: tab.lastAccessed,
  };

  chrome.runtime.sendMessage({
    type: "tabData",
    payload: payload,
  });

  api.CallAPI("POST", "http://localhost:3312/demo", payload);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      chrome.runtime.sendMessage({
        type: "console",
        message: "User switched tab or minimized window",
      });
    }
  });
}

async function GetTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  return await chrome.tabs.query(queryOptions);
}
