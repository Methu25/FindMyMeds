// src/services/Admin/PharmacyService.jsx

// Use full backend URL to avoid proxy issues during development
const API_BASE = "http://localhost:8080/api/admin/pharmacies";

// helper function to handle responses
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || "API request failed");
  }
  return response.json();
}

// --- PHARMACY LIST ---
export async function getPharmacies(status = null, type = null) {
  let url = `${API_BASE}`;
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (type) params.append("type", type);
  if ([...params].length) url += `?${params.toString()}`;
  const response = await fetch(url, { method: "GET" });
  return handleResponse(response);
}

// --- SINGLE PHARMACY DETAILS ---
export async function getPharmacyDetails(pharmacyId) {
  const response = await fetch(`${API_BASE}/${pharmacyId}`, { method: "GET" });
  return handleResponse(response);
}

export async function getPharmacyProfile(pharmacyId) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/profile`, { method: "GET" });
  return handleResponse(response);
}

// --- CREATE / UPDATE PHARMACY ---
export async function createPharmacy(pharmacy) {
  const response = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pharmacy),
  });
  return handleResponse(response);
}

export async function updatePharmacy(pharmacyId, pharmacy) {
  const response = await fetch(`${API_BASE}/${pharmacyId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pharmacy),
  });
  return handleResponse(response);
}

// --- PHARMACY INVENTORY ---
export async function getInventory(pharmacyId) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/inventory`, { method: "GET" });
  return handleResponse(response);
}

export async function addInventory(pharmacyId, item) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return handleResponse(response);
}

export async function updateInventory(pharmacyId, inventoryId, item) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/inventory/${inventoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return handleResponse(response);
}

export async function deleteInventory(pharmacyId, inventoryId) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/inventory/${inventoryId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

// --- PHARMACY ACTIONS ---
export async function activatePharmacy(pharmacyId) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/activate`, { method: "PATCH" });
  return handleResponse(response);
}

export async function suspendPharmacy(pharmacyId) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/suspend`, { method: "PATCH" });
  return handleResponse(response);
}

export async function removePharmacy(pharmacyId) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/remove`, { method: "PATCH" });
  return handleResponse(response);
}

export async function rejectPharmacy(pharmacyId, reason) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/reject`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });
  return handleResponse(response);
}


// --- PHARMACY REPORTS ---
export async function getReports(pharmacyId) {
  const response = await fetch(`${API_BASE}/${pharmacyId}/reports`, { method: "GET" });
  return handleResponse(response);
}

export async function updateReportStatus(reportId, status) {
  const response = await fetch(`${API_BASE}/reports/${reportId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
}

// --- NOTIFICATIONS ---
export async function getNotifications() {
  const response = await fetch(`${API_BASE.replace("/pharmacies", "/notifications")}`, { method: "GET" });
  return handleResponse(response);
}

export async function markNotificationRead(notificationId) {
  const response = await fetch(`${API_BASE.replace("/pharmacies", "/notifications")}/${notificationId}/read`, { method: "PUT" });
  return handleResponse(response);
}
