import api from "./api.js";
import fetchPermissions from "./permissions/tab_permissions.js";
import trace from "./trace.js";

let isStopping = false;

async function retrieveUser() {
  return new Promise((resolve, reject) => {
    chrome.storage.session.get(["user"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.user);
      }
    });
  });
}

async function stopRecording() {
  if (isStopping) return;
  isStopping = true;

  const user = await retrieveUser();

  chrome.runtime.sendMessage({
    type: "console",
    message: `${user} stopped recording`,
  });
}

async function recordTabs() {
  let [tab] = await getTab();

  const storageData = await chrome.storage.session.get(["lectureLink"]);
  const lecture = storageData.lectureLink;
  const user = await retrieveUser();
  const permissions = await fetchPermissions(tab.id)

  const payload = buildPayload(tab, lecture, "start", user, permissions);

  chrome.runtime.sendMessage({
    type: "tabData",
    payload: payload,
  });

  api.callAPI("POST", "http://localhost:3312/demo", payload);
}

async function getTab() {
  return await chrome.tabs.query({ active: true, lastFocusedWindow: true });
}

function buildPayload(tab, target, eventType, user, permissions) {
  return {
    onlineClass: target,
    user: user,
    url: tab.url,
    title: tab.title,
    muted: tab.mutedInfo.muted,
    cameraEnabled: permissions.cam,
    microphoneEnabled: permissions.mic,
    cameraStreaming: false,
    microphoneStreaming: false,
    lastAccessed: tab.lastAccessed,
    timestamp: Date.now(),
    event: eventType,
  };
}

export default { stopRecording, recordTabs, buildPayload, retrieveUser };
