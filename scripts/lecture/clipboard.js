function copyToClipboard(field) {
  var title = field.value;
  title.select();

  navigator.clipboard.writeText(title.value);
  alert("Título copiado para a área de transferência!");
}

export function triggerCopy(button, field) {
  button.addEventListener("click", () => {
    copyToClipboard(field);
  });
}
