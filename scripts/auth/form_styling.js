export function styleOnToken(components, user) {
  components.fetchedUser.innerHTML = user;
  components.tokenForm.style.display = "block";
  components.loginForm.style.display = "none";
  components.footerButton.textContent = "voltar";
  Object.assign(components.footerButton.style, {
    color: "#e73752",
    fontWeight: "bold",
    border: "none",
  });
}
