import api from "./api.js";

let button = document.getElementById("allow");

button.addEventListener("click", async () => {
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
});

async function GetTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  return await chrome.tabs.query(queryOptions);
}
