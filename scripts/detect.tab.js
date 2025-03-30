let button = document.getElementById("allow");
let tab = "chrome"

button.addEventListener("click", () =>{
    chrome.runtime.sendMessage({
        type: "console",
        tab: tab
    });
})