import api from "./api.js";
import { CONFIG } from "./config.js";

const loginForm = document.getElementById("form_login");
const tokenForm = document.getElementById("token_submit");
const fetchedUser = document.getElementById("fetchedUser");
const footerButton = document.getElementById("register");

footerButton.addEventListener("click", () => {
  chrome.storage.local.get(["hasToken"], (value) => {
    if (value.hasToken === true) {
      loginForm.style.display = "none";
      tokenForm.style.display = "block";
      footerButton.innerText = "Cancelar";
      footerButton.style.color = "red";

      footerButton.onclick = () => {
        chrome.storage.local.remove("hasToken", () => {
          window.location.reload();
        });
      };
    } else {
      chrome.storage.local.set({ state: "register" }, () => {
        chrome.runtime.sendMessage({
          type: "console",
          message: "Redirecionando para a página de registro",
        });
        window.location.href = "register.html";
      });
    }
  });
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  try {
    const response = await api.callAPI(
      "PATCH",
      `${CONFIG.API_BASE_URL}${CONFIG.LOGIN_ENDPOINT}`,
      { email: email }
    );

    if (response && response.newToken) {
      chrome.storage.local.get(["hasToken"], (value) => {
        if (value.hasToken === true) {
          fetchedUser.innerHTML = email;
          tokenForm.style.display = "block";
          loginForm.style.display = "none";
        } else {
          chrome.runtime.sendMessage({
            type: "console",
            message: `User have no token`,
          });
        }
      });

      chrome.storage.local.set({ user: email, token: response.newToken });
    } else {
      alert("Token não recebido. Verifique o email informado.");
    }
  } catch (error) {
    console.error("Erro ao buscar token:", error);
    alert("Erro ao conectar com o servidor.");
  }
});
