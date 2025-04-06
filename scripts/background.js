import api from "./api.js";
import record from "./record.js";
import trace from "./trace.js";

const teamsURL = "https://teams.microsoft.com/v2/";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "click_event") {
    console.log("Click event captured in current webpage");
  } else if (request.type === "console") {
    console.log(request.message);
  } else if (request.type === "tabData") {
    api.callAPI("POST", "http://localhost:3312/demo", request.payload);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (tab.url && !tab.url.startsWith(teamsURL)) {
    console.log("User left Microsoft Teams tab");

    const payload = record.buildPayload(tab, teamsURL, "onActivated");

    api.callAPI("POST", "http://localhost:3312/demo", payload);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (tab.url && !tab.url.startsWith(teamsURL)) {
      console.log("User left Microsoft Teams tab");

      const payload = record.buildPayload(tab, teamsURL, "onUpdated");

      api.callAPI("POST", "http://localhost:3312/demo", payload);
    }
  }
});
