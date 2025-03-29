chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getActiveTab") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            sendResponse({ tab: tabs[0] });
        });
        return true; 
    }
});
