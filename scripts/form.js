const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const student = document.getElementById("email").value;
  const meet = document.getElementById("meet").value;

  chrome.storage.local.set(
    { student: student, meet: meet, state: "logged" },
    () => {
      alert("Formulário enviado com sucesso!");
      window.location.href = "popup.html";
    }
  );
});
