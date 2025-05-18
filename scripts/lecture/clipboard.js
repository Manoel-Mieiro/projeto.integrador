export function initClipboardCopyListener() {
  document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "copy") {
      const field = document.getElementById("lecture_content");
      if (field) {
        navigator.clipboard.writeText(field.textContent).then(() => {
          alert("Título copiado para a área de transferência!");
        }).catch(err => {
          console.error("Erro ao copiar:", err);
        });
      } else {
        console.warn("Campo lecture_content não encontrado.");
      }
    }
  });
}
