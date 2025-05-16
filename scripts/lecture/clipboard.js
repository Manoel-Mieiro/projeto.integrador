function copyToClipboard(field) {
  navigator.clipboard.writeText(field.textContent).then(() => {
    alert("Título copiado para a área de transferência!");
  });
}

export function triggerCopy(button, field) {
  button.addEventListener("click", () => {
    copyToClipboard(field);
  });
}
