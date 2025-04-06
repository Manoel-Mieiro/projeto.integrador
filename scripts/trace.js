function buildLogMessage(url, target) {
  if (url !== target) {
    return `User left ${target} and is now on ${url}`;
  } else {
    return `User's watching online class`;
  }
}

export default { buildLogMessage };
