import { styleOnToken } from "./form_styling.js";
import { CONFIG } from "../config.js";
import api from "../api.js";


export async function triggerTokenRequest(document, components) {
  components.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // chamar a API de user para ver se o email existe
    // se existir, chamar a API de login e salvar o usuário(objeto)
    // se não existir, mostrar mensagem de erro
    const email = document.getElementById("email").value;
    try {
      const response = await api.callAPI(
        "PATCH",
        `${CONFIG.API_BASE_URL}${CONFIG.LOGIN_ENDPOINT}`,
        { email: email }
      );

      if (response && response.newToken) {
        styleOnToken(components, email);

        chrome.storage.session.set({
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
}
