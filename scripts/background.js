chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "click_event") {
        console.log("Click event captured in current webpage");
    } else if (request.type === "console") {
        console.log("Start pressed");

        if (Array.isArray(request.tab)) {
            request.tab.forEach(element => {
                console.log("Tab:", element);
            });
        } else {
            console.error("request.tab is not an array");
        }
    } else if (request.type === "tabData") {
        console.log("Payload recebido do popup:", request.payload)
    }
});
