// import GetTab from "./get.tab";

let button = document.getElementById("allow");

async function GetTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    return await chrome.tabs.query(queryOptions);
}

button.addEventListener("click", async () =>{
    let [tab] = await GetTab();
    console.log(`Fetched Tab: ${[tab]}`)
    chrome.runtime.sendMessage({
        type: "console",
        tab: [tab]
    });
})