import api from "./api.js";
import trace from "./trace.js";

let isStopping = false;

function retrieveUser() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["student"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.student);
      }
    });
  });
}

function retrieveMeet() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["meet"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.meet);
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

  chrome.storage.local.remove(["state", "student", "meet"], () => {
    console.log("State removed from storage");
    alert("Recording stopped and state removed from storage.");
    window.location.href = "redirect.html";
  });
}

async function recordTabs() {
  let [tab] = await getTab();
  const meet = await retrieveMeet();

  const payload = await buildPayload(tab, meet);

  chrome.runtime.sendMessage({
    type: "tabData",
    payload: payload,
  });

  api.callAPI("POST", "http://localhost:3312/demo", payload);
}

async function getTab() {
  return await chrome.tabs.query({ active: true, lastFocusedWindow: true });
}

async function buildPayload(tab, target, eventType) {
  const user = await retrieveUser();

  return {
    org: null,
    period: null,
    subject: null,
    teacher: null,
    student: user,
    url: tab.url || null,
    onlineClass: target,
    title: tab.title,
    muted: tab.mutedInfo.muted,
    lastAccessed: trace.standardizeTime(new Date(tab.lastAccessed)),
    timestamp: trace.standardizeTime(new Date()),
    event: eventType,
    message: trace.buildLogMessage(tab.url, target, user),
  };
}

export default {
  stopRecording,
  recordTabs,
  buildPayload,
  retrieveUser,
  retrieveMeet,
};
