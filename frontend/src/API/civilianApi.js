import adminClient from "./adminClient";

export async function searchPharmacies(query) {
    const params = {};
    if (query) params.query = query;

    const res = await adminClient.get("/api/pharmacies", { params });
    return res.data;
}

export async function getNearbyPharmacies(lat, lng, radius = 10) {
    const params = { lat, lng, radius };
    const res = await adminClient.get("/api/pharmacies/nearby", { params });
    return res.data;
}
