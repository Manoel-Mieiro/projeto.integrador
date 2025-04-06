function updateButton(btn) {
  let newId = btn.id === "start" ? "stop" : "start";

  chrome.runtime.sendMessage({
    type: "console",
    message: `Change button from ${btn.id} to ${newId}`,
  });

  btn.id = newId;
  btn.textContent = newId === "start" ? "START" : "STOP";

  localStorage.setItem("buttonId", newId); 
}

export default { updateButton };
