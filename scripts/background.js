import api from "./api.js";
import record from "./record.js";

const teamsURL = "https://teams.microsoft.com/v2/";

async function shouldRecord() {
  const { recording } = await chrome.storage.local.get("recording");
  return recording;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "click_event") {
    console.log("Click event captured in current webpage");
  } else if (request.type === "console") {
    console.log(request.message);
  } else if (request.type === "tabData") {
    api.callAPI("POST", "http://localhost:8183/traces", request.payload);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (!(await shouldRecord())) return;

  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (tab.url && !tab.url.startsWith(teamsURL)) {
    console.log("User left Microsoft Teams tab");

    const payload = record.buildPayload(tab, teamsURL, "onActivated");

    api.callAPI("POST", "http://localhost:8183/traces", payload);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (!(await shouldRecord())) return;

    if (tab.url && !tab.url.startsWith(teamsURL)) {
      console.log("User left Microsoft Teams tab");

      const payload = record.buildPayload(tab, teamsURL, "onUpdated");

      api.callAPI("POST", "http://localhost:8183/traces", payload);
    }
  }
});
