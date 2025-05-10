export function formFooterButton(btn) {
  btn.addEventListener("click", () => {
    chrome.storage.session.get(["hasToken"], (value) => {
      if (value.hasToken === true) {
        btn.onclick = () => {
          chrome.storage.session.remove("hasToken", () => {
            window.location.reload();
          });
        };
      } else {
        chrome.storage.session.set({ state: "register" }, () => {
          chrome.runtime.sendMessage({
            type: "console",
            message: "Redirecionando para a página de registro",
          });
          window.location.href = "register.html";
        });
      }
    });
  });
}
