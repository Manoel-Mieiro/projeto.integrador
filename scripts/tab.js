import trace from "./trace";
async function getTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  return await chrome.tabs.query(queryOptions);
}

function buildPayload(tab, target) {
  let payload = {
    url: tab.url,
    onlineClass: target,
    title: tab.title,
    muted: tab.mutedInfo.muted,
    lastAccessed: tab.lastAccessed,
    timestamp: Date.now().toString,
    message: trace.buildLogMessage(tab.url, target),
  };

  return payload;
}

export default { buildPayload, getTab };
