const LOG_API = "http://20.207.122.201/evaluation-service/logs";

let token = "";

export function setToken(t) {
  token = t;
}

export async function Log(message) {
  await fetch(LOG_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      stack: "frontend",
      level: "info",
      package: "api",
      message: message,
    }),
  });
}