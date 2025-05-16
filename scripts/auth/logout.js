export function logout(btn) {
  btn.addEventListener("click", () => {
    chrome.storage.session.clear(function () {
      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
    });
    window.location.href = "redirect.html";
  });
}
