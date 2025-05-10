export function landingView(document, elements) {
  document.addEventListener("DOMContentLoaded", async () => {
    chrome.storage.session.get(["hasToken", "user"], (value) => {
      if (value.hasToken === true && value.user) {
        elements.loginForm.style.display = "none";
        elements.footerButton.textContent = "voltar";
        Object.assign(elements.footerButton.style, {
          color: "#e73752",
          fontWeight: "bold",
          border: "none",
        });
        elements.fetchedUser.innerHTML = value.user;
        elements.tokenForm.style.display = "block";
      } else {
        elements.loginForm.style.display = "block";
        elements.tokenForm.style.display = "none";
      }
    });
  });
}
