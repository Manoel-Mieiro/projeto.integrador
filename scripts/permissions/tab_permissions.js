export default async function fetchPermissions(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      return Promise.all([
        navigator.permissions.query({ name: "microphone" }),
        navigator.permissions.query({ name: "camera" }),
      ])
        .then(([micStatus, camStatus]) => {
          return {
            mic: micStatus.state === "granted",
            cam: camStatus.state === "granted",
          };
        })
        .catch((err) => {
          chrome.runtime.sendMessage({
            type: "console",
            message: `Erro ao consultar permissões: ${err.message}`,
          });
          return { mic: false, cam: false };
        });
    },
  });

  return result;
}
