chrome.storage.local.get(["state"], (result) => {
    if (result.state === "logged") {
      window.location.href = "popup.html";
    } else {
      window.location.href = "form.html";
    }
  });
  