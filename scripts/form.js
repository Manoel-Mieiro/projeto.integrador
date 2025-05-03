import api from "./api.js";
import getFromStorage from "./storage.js";
import { CONFIG } from "./config.js";

const loginForm = document.getElementById("form_login");
const tokenForm = document.getElementById("token_submit");
const fetchedUser = document.getElementById("fetchedUser");
const footerButton = document.getElementById("register");

document.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["hasToken", "user"], (value) => {
    if (value.hasToken === true && value.user) {
      loginForm.style.display = "none";
      footerButton.textContent = "voltar";
      Object.assign(footerButton.style, {
        color: "#e73752",
        fontWeight: "bold",
        border: "none",
      });
      fetchedUser.innerHTML = value.user;
      tokenForm.style.display = "block";
    } else {
      loginForm.style.display = "block";
      tokenForm.style.display = "none";
    }
  });
});

footerButton.addEventListener("click", () => {
  chrome.storage.local.get(["hasToken"], (value) => {
    if (value.hasToken === true) {
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
      fetchedUser.innerHTML = email;
      tokenForm.style.display = "block";
      loginForm.style.display = "none";
      footerButton.textContent = "voltar";
      Object.assign(footerButton.style, {
        color: "#e73752",
        fontWeight: "bold",
        border: "none",
      });

      chrome.storage.local.set({
        user: email,
        token: response.newToken,
        hasToken: true,
      });
    } else {
      alert("Token não recebido. Verifique o email informado.");
    }
  } catch (error) {
    console.error("Erro ao buscar token:", error);
    alert("Erro ao conectar com o servidor.");
  }
});

tokenForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = await getFromStorage("user");
  const token = document.getElementById("tokenValue").value;

  chrome.runtime.sendMessage({
    type: "console",
    message: `Token informado no input: \n${token}`,
  });

  try {
    const response = await api.callAPI(
      "GET",
      `${CONFIG.API_BASE_URL}${CONFIG.LOGIN_ENDPOINT}?usr=${email}&token=${token}`
    );

    if (response) {
      chrome.runtime.sendMessage({
        type: "console",
        message: `${email} acessou a extensão com sucesso`,
      });
      chrome.storage.local.set({ state: "logged" });
      window.location.href = "redirect.html";
    } else {
      chrome.runtime.sendMessage({
        type: "console",
        message: "Não foi possível acessar o servidor: Token inválido",
      });
      alert("Token Inválido");
    }
  } catch (error) {
    chrome.runtime.sendMessage({
      type: "console",
      message: `Token/usuário informado incorreto(s): \n${error}`,
    });
    alert("Token Inválido");
  }
});

// ainda não usada, pretendo modificar o botão para entradas incorretas
function resendToken(){
  button = tokenForm.getElementById("auth")
  button.textContent = "Reenviar"

  button.addEventListener("submit", async() => {
    const response = await api.callAPI(
      "GET",
      `${CONFIG.API_BASE_URL}${CONFIG.LOGIN_ENDPOINT}?usr=${email}&token=${token}`
    );
    return response
  })
}
