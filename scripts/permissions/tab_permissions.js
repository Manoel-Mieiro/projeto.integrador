export default async function fetchPermissions(tabId) {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      navigator.permissions.query({ name: "microphone" }).then(statusMic => {
        navigator.permissions.query({ name: "camera" }).then(statusCam => {
          chrome.runtime.sendMessage({
            type: "console",
            message: `[MICROPHONE]: ${statusMic.state}\n[CAMERA]: ${statusCam.state}`,
          });
        });
      }).catch(err => {
        chrome.runtime.sendMessage({
          type: "console",
          message: `Erro ao consultar permissões: ${err.message}`,
        });
      });
    }
  });
}
