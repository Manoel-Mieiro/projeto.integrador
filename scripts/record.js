import api from "./api.js";
import trace from "./trace.js";

const teamsURL = "https://teams.microsoft.com/v2/";

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

  const payload = buildPayload(tab, teamsURL);

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
    org: "CEFET/RJ",
    period: "13:00-15:00",
    subject: "Programação Web",
    teacher: "Diego Brando",
    student: "sman.aluno@cefet-rj.br",
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
