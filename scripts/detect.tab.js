document.getElementById("allow").addEventListener("click", async () => {
    console.log("Button clicked! Sending message to background script.");

    chrome.runtime.sendMessage({ action: "getActiveTab" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error:", chrome.runtime.lastError);
        } else if (response) {
            console.log("Active Tab:", response.tab);
        } else {
            console.warn("No response received.");
        }
    });
});
