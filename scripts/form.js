import api from "./api.js";
import { CONFIG } from "./config.js";

const loginForm = document.getElementById("form_login");
const tokenForm = document.getElementById("token_submit");
const fetchedUser = document.getElementById("fetchedUser");
const register = document.getElementById("register");

register.addEventListener("click", () => {
  chrome.storage.local.set({ state: "register" }, () => {
    chrome.runtime.sendMessage({
      type: "console",
      message: "Redirecionando para a página de registro",
    });
    window.location.href = "register.html";
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

    chrome.runtime.sendMessage({
      type: "console",
      message: `Token gerado foi: ${response}`,
    });

    if (response && response.newToken) {
      fetchedUser.innerHTML = email;
      tokenForm.style.display = "block";
      loginForm.style.display = "none";

      chrome.storage.local.set({ user: email, token: response.newToken });
    } else {
      alert("Token não recebido. Verifique o email informado.");
    }
  } catch (error) {
    console.error("Erro ao buscar token:", error);
    alert("Erro ao conectar com o servidor.");
  }

  // const meet = document.getElementById("meet").value;
});
