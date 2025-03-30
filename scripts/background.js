chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "click_event") {
        console.log("click event captured in current webpage");
    } else if (request.type == "console") {
        console.log("start pressed")
        console.log(`Tab's ${request.tab}`)
    }
});