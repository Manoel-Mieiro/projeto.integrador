import api from "./api.js";
import trace from "./trace.js";

const teamsURL = "https://teams.microsoft.com/v2/";

async function stopRecording() {
  chrome.runtime.sendMessage({
    type: "console",  
    message: "User stopped recording",
  });
}

async function recordTabs() {
  let [tab] = await getTab();

  const payload =  buildPayload(tab, teamsURL);

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

export default { stopRecording, recordTabs, buildPayload };
