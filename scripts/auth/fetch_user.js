import api from "../api.js";
import { CONFIG } from "../config.js";

export async function fetchUser(email) {
  try {
    const response = await api.callAPI(
      "GET",
      `${CONFIG.API_BASE_URL}/${CONFIG.USERS_ENDPOINT}/${email}`
    );
    return response ? response : null;
  } catch (error) {
    chrome.runtime.sendMessage({
      type: "console",
      message: `ERRO para ${email}: ${error}`,
    });
    throw error;
  }
}
