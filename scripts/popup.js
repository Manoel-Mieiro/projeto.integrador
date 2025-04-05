import api from "./api.js";

let button = document.getElementById("allow");

button.addEventListener("click", async () => {
    let [tab] = await GetTab();

    const username = await GetUsernameFromTab();

    console.log(`Fetched Username: ${username}`)

    const payload = {
        url: tab.url,
        title: tab.title,
        muted: tab.mutedInfo.muted,
        lastAccessed: tab.lastAccessed,
        username: username
    }

    chrome.runtime.sendMessage({
        type: "tabData",
        payload: payload
    });

    api.CallAPI("POST", "http://localhost:3312/demo", payload)
})

async function GetTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    return await chrome.tabs.query(queryOptions);
}

async function GetUsernameFromTab() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: "getUsername" }, (response) => {
                console.log("Response from content script:", response);
                resolve(response?.username);
            });
        });
    });
}

