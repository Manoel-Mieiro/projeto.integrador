const millisecondsToMinutes = (ms) => Math.floor(ms / 60000);

const lastAccess = (ms) => millisecondsToMinutes(Date.now() - ms);

export default { millisecondsToMinutes, lastAccess };
