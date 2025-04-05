function FetchUsername() {
    for (const k of Object.keys(localStorage)) {
        try {
            const v = JSON.parse(localStorage[k])
            if (v && v.username) {
                return v.username
            }
        } catch (error) {
            continue;
        }
    }
    return null
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getUsername") {
        const username = FetchUsername()
        sendResponse({ username: username })
    }
});
