async function callAPI(method, server, payload) {
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
    return null;
  }

  if (response && response.ok) {
    const data = await response.json();
    console.log("API call successful:", data);
    return data; 
  } else {
    console.error(
      "API call failed:",
      response ? response.status : "No response"
    );
    return null;
  }
}

export default { callAPI };
