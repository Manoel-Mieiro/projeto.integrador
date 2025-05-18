import api from "./api.js";
import trace from "./trace.js";

let isStopping = false;

function retrieveUser() {
  return new Promise((resolve, reject) => {
    chrome.storage.session.get(["student"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.student);
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

  const payload = buildPayload(tab, lecture);

  chrome.runtime.sendMessage({
    type: "tabData",
    payload: payload,
  });

  api.callAPI("POST", "http://localhost:3312/demo", payload);
}

async function getTab() {
  return await chrome.tabs.query({ active: true, lastFocusedWindow: true });
}

function buildPayload(tab, target, eventType) {
  return {
    url: tab.url,
    onlineClass: target,
    title: tab.title,
    muted: tab.mutedInfo.muted,
    lastAccessed: tab.lastAccessed,
    timestamp: Date.now(),
    event: eventType,
    message: trace.buildLogMessage(tab.url, target),
  };
}

export default { stopRecording, recordTabs, buildPayload, retrieveUser };
