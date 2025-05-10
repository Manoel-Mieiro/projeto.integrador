import { styleOnToken } from "./form_styling.js";
import { fetchUser } from "./fetch_user.js";
import { CONFIG } from "../config.js";
import api from "../api.js";

export async function triggerTokenRequest(document, components) {
  components.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    try {
      const user = await fetchUser(email);
      chrome.runtime.sendMessage({ type: "console", message: user });

      if (user && user.email) {
        const response = await api.callAPI(
          "PATCH",
          `${CONFIG.API_BASE_URL}${CONFIG.LOGIN_ENDPOINT}`,
          { email: email }
        );

        if (response && response.newToken) {
          styleOnToken(components, email);

          chrome.storage.session.set({
            user: email,
            role: user.role,
            hasToken: true,
          });
        } else {
          alert(`"Ocorreu um erro no servidor"`);
        }
      } else {
        alert(`${email} não está cadastrado`);
        chrome.storage.session.set({ state: "register" });
        window.location.href = "redirect.html";
      }
    } catch (error) {
      alert(`Erro de conexão com o servidor: ${error}`);
    }
  });
}
