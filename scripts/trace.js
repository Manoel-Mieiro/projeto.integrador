function buildLogMessage(url, target, user) {
  if (url !== target) {
    const timestamp = new Date().toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    return `[${timestamp}] ${user} left ${target} and is now on ${url}`;
  } else {
    return `${user}'s watching online class`;
  }
}

export default { buildLogMessage };
