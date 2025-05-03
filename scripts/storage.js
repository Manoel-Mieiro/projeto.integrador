function getFromStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.session.get([key], (result) => {
      resolve(result[key]);
    });
  });
}

export default getFromStorage;
