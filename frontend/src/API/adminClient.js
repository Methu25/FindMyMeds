import axios from "axios";

// IMPORTANT:
// If you use Vite proxy, set baseURL to "" and use "/api" URLs.
// Otherwise set baseURL to "http://localhost:8081".
const adminClient = axios.create({
  baseURL: "http://localhost:8081",
  timeout: 20000,
});

// Basic Auth helper (for your Spring Security generated password)
export function setBasicAuth(username, password) {
  const token = btoa(`${username}:${password}`);
  adminClient.defaults.headers.common["Authorization"] = `Basic ${token}`;
}

export default adminClient;
