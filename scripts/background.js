const teamsURL = "https://teams.microsoft.com/v2/";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "click_event") {
    console.log("Click event captured in current webpage");
  } else if (request.type === "console") {
    console.log(request.message);
  } else if (request.type === "tabData") {
    console.log("Payload recebido do popup:", request.payload);

    console.log("URL:", request.payload.url);
    console.log("Title:", request.payload.title);
    console.log("Muted:", request.payload.muted);
    console.log("LastAccessed:", request.payload.lastAccessed);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (tab.url && !tab.url.startsWith(teamsURL)) {
    console.log("User left Microsoft Teams tab");
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (tab.url && !tab.url.startsWith(teamsURL)) {
      console.log("User left Microsoft Teams tab");
    }
  }
});
