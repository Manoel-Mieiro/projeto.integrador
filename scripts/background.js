import api from "./api.js";
import record from "./record.js";
import { CONFIG } from "./config.js";
import fetchPermissions from "./permissions/tab_permissions.js";

async function shouldRecord() {
  const { recording } = await chrome.storage.session.get("recording");
  return recording;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "click_event") {
    console.log("Click event captured in current webpage");
  } else if (request.type === "console") {
    console.log(request.message);
  } else if (request.type === "tabData") {
    api.callAPI(
      "POST",
      `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINT}`,
      request.payload
    );
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (!(await shouldRecord())) return;

  const lecture = await chrome.storage.session.get(["lectureLink"]);
  const tab = await chrome.tabs.get(activeInfo.tabId);
  const student = await record.retrieveUser();
  const permissions = await fetchPermissions(tab.id);

  const payload = record.buildPayload(
    tab,
    lecture.lectureLink,
    "onActivated",
    student,
    permissions
  );

  api.callAPI("POST", `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINT}`, payload);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (!(await shouldRecord())) return;

    const lecture = await chrome.storage.session.get(["lectureLink"]);
    const student = await record.retrieveUser();
    const permissions = await fetchPermissions(tab.id);

    const payload = record.buildPayload(
      tab,
      lecture.lectureLink,
      "onUpdated",
      student,
      permissions
    );

    api.callAPI(
      "POST",
      `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINT}`,
      payload
    );
  }
});
