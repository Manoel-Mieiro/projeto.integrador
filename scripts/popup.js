import api from "./api.js";
let button = document.getElementById("allow");

async function GetTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    return await chrome.tabs.query(queryOptions);
}

button.addEventListener("click", async () => {
    let [tab] = await GetTab();

    const payload = {
        url: tab.url,
        title: tab.title,
        muted: tab.mutedInfo.muted,
        lastAccessed: tab.lastAccessed
    }

    console.log(`Fetched Tab: ${[tab]}`)

    sendTabToBackground(tab);

    api.CallAPI("POST", "http://localhost:3312/demo", payload)
    
})

function sendTabToBackground(tab) {
    chrome.runtime.sendMessage({
        type: "console",
        tab: [tab]
    });
}