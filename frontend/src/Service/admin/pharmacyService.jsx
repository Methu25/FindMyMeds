// src/services/admin/pharmacyService.js

const API_BASE = "/api"; // adjust if you have a proxy or full URL

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
  let url = `${API_BASE}/pharmacies`;
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (type) params.append("type", type);
  if ([...params].length) url += `?${params.toString()}`;

  const response = await fetch(url, { method: "GET" });
  return handleResponse(response);
}

// --- SINGLE PHARMACY DETAILS ---
export async function getPharmacyDetails(pharmacyId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}`, { method: "GET" });
  return handleResponse(response);
}

export async function getPharmacyProfile(pharmacyId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/profile`, { method: "GET" });
  return handleResponse(response);
}

// --- PHARMACY INVENTORY ---
export async function getInventory(pharmacyId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/inventory`, { method: "GET" });
  return handleResponse(response);
}

export async function addInventory(pharmacyId, item) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return handleResponse(response);
}

export async function updateInventory(pharmacyId, inventoryId, item) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/inventory/${inventoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return handleResponse(response);
}

export async function deleteInventory(pharmacyId, inventoryId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/inventory/${inventoryId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

// --- PHARMACY ACTIONS ---
export async function approvePharmacy(pharmacyId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/approve`, { method: "POST" });
  return handleResponse(response);
}

export async function rejectPharmacy(pharmacyId, reason) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });
  return handleResponse(response);
}

export async function suspendPharmacy(pharmacyId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/suspend`, { method: "POST" });
  return handleResponse(response);
}

export async function activatePharmacy(pharmacyId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/activate`, { method: "POST" });
  return handleResponse(response);
}

export async function removePharmacy(pharmacyId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/remove`, { method: "POST" });
  return handleResponse(response);
}

// --- PHARMACY REPORTS ---
export async function getReports(pharmacyId) {
  const response = await fetch(`${API_BASE}/pharmacies/${pharmacyId}/reports`, { method: "GET" });
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
  const response = await fetch(`${API_BASE}/notifications`, { method: "GET" });
  return handleResponse(response);
}

export async function markNotificationRead(notificationId) {
  const response = await fetch(`${API_BASE}/notifications/${notificationId}/read`, { method: "PUT" });
  return handleResponse(response);
}
