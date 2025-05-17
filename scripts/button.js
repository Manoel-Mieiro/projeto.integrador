async function updateButton(btn) {
  const state = await chrome.storage.session.get(["recording"]);
  const isRecording = state.recording === true;

  btn.id = isRecording ? "stop" : "start";
  btn.textContent = isRecording ? "PARAR" : "ENTRAR";
}

export default { updateButton };
