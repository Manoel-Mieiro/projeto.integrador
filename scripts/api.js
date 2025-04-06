async function CallAPI(method, server, payload) {
  let response = null;
  try {
    response = await fetch(server, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.log("Error in CallAPI:", error);
  }

  if (response && response.ok) {
    console.log("API call successful:", await response.json());
  } else {
    console.error(
      "API call failed:",
      response ? response.status : "No response"
    );
  }
}

export default { CallAPI };
