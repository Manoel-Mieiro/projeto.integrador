import api from "./api.js";
import fetchPermissions from "./media/tab_permissions.js";
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

async function recordTabs(tab, lecture) {
  const user = await retrieveUser();
  const permissions = await fetchPermissions(tab.id);

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

async function startLecture() {
  const { lectureLink } = await chrome.storage.session.get(["lectureLink"]);
  const [tab] = await getTab();

  chrome.runtime.sendMessage({
    type: "console",
    message: "Redirecionando para o link da reunião: " + lectureLink,
  });

  chrome.tabs.update(tab.id, { url: lectureLink });
}

function isTitleValid(title) {
  const regex = /^\[[^\]]+\]/;
  return regex.test(title);
}

export default {
  stopRecording,
  recordTabs,
  buildPayload,
  retrieveUser,
  startLecture,
};
