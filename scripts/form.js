import { landingView } from "./landing/token_request.js";
import { formFooterButton } from "./buttons/footer_button.js";
import { triggerTokenRequest } from "./auth/token_request.js";
import { submitToken } from "./auth/token_submission.js";

const formComponents = {
  loginForm: document.getElementById("form_login"),
  tokenForm: document.getElementById("token_submit"),
  fetchedUser: document.getElementById("fetchedUser"),
  footerButton: document.getElementById("register"),
};

landingView(document, formComponents);
// Verifica se o usuário já tem um token

formFooterButton(formComponents.footerButton);
// faz o controle do botão do footer

await triggerTokenRequest(document, formComponents);
// view condicional com base no resultado do request de token

submitToken(formComponents.tokenForm, document);
// chama a API para verificar se o token está correto
