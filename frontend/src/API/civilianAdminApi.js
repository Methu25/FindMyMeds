import adminClient from "./adminClient";

export async function fetchCivilianMetrics() {
  const res = await adminClient.get("/api/admin/civilians/metrics");
  return res.data;
}

export async function fetchCivilians({ status, search, page, size }) {
  const params = {};
  if (status) params.status = status;
  if (search) params.search = search;
  params.page = page ?? 0;
  params.size = size ?? 10;

  const res = await adminClient.get("/api/admin/civilians", { params });
  return res.data; // Spring Page object
}

export async function fetchCivilianDetails(id) {
  const res = await adminClient.get(`/api/admin/civilians/${id}`);
  return res.data;
}

export async function tempBanCivilian(id, reason, adminId) {
  await adminClient.post(`/api/admin/civilians/${id}/temp-ban?adminId=${adminId}`, { reason });
}

export async function permanentBanCivilian(id, reason, adminId) {
  await adminClient.post(`/api/admin/civilians/${id}/permanent-ban?adminId=${adminId}`, { reason });
}
