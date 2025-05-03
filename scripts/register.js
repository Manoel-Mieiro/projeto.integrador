// É usado o DOMContentLoaded para garantir que o DOM esteja completamente carregado antes de adicionar o evento de clique ao botão "back". Isso evita erros caso o script seja executado antes do carregamento completo do DOM.
document.addEventListener("DOMContentLoaded", () => {
  const back = document.getElementById("back");

  if (back) {
    back.addEventListener("click", () => {
      chrome.storage.local.remove("state", () => {
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
