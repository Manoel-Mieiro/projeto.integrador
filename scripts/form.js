const form = document.getElementById("form");
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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const student = document.getElementById("email").value;
  // const meet = document.getElementById("meet").value;

  chrome.storage.local.set(
    // { student: student, meet: meet, state: "logged" },
    { student: student, state: "logged" },
    () => {
      alert("Formulário enviado com sucesso!");
      window.location.href = "popup.html";
    }
  );
});
