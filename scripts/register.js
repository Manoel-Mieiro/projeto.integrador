import api from "./api.js";
import { CONFIG } from "./config.js";

// É usado o DOMContentLoaded para garantir que o DOM esteja completamente carregado antes de adicionar o evento de clique ao botão "back". Isso evita erros caso o script seja executado antes do carregamento completo do DOM.
document.addEventListener("DOMContentLoaded", () => {
  const back = document.getElementById("back");

  if (back) {
    back.addEventListener("click", () => {
      chrome.storage.session.remove("state", () => {
        chrome.runtime.sendMessage({
          type: "console",
          message: "Voltar para a página inicial",
        });
        window.location.href = "redirect.html";
      });
    });
  } else {
    chrome.runtime.sendMessage({
      type: "console",
      message: "Botão back não foi encontrado",
    });
  }
});

document.addEventListener("submit", async() => {
  const email = document.getElementById("email").value;
  const role = document.getElementById("roles").value;

  chrome.runtime.sendMessage({
    type: "console",
    message: `Cadastrando usuário [${role}]${email}`,
  });

  const response = await api.callAPI(
    "GET",
    `${CONFIG.API_BASE_URL}${CONFIG.USERS_ENDPOINT}`,
    {
      email: email,
      role: role,
    }
  );

  if (response) {
    chrome.storage.session.remove("state", () => {
      alert("Cadastro Concluído!");
      setTimeout(() => {
        window.location.href = "redirect.html";
      }, 3000);
    });
  } else {
    chrome.runtime.sendMessage({
      type: "console",
      message: `Ocorreu um erro inesperado ao chamar a API`,
    });

    alert("Ocorreu um erro ao chamar o servidor!");
  }
});
