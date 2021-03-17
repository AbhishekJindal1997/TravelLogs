const API_URL = "http://localhost:1337";
//const token = localStorage.getItem("token");
// const id = user.id;

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

// export async function createLogEntries(entry) {
//   const response = await fetch(`${API_URL}/api/logs`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       "x-auth-token": token,
//     },
//     body: JSON.stringify(entry),
//   });
//   return response.json();
// }
