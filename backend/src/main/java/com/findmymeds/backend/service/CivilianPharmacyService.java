package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.repository.CivilianPharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CivilianPharmacyService {

    @Autowired
    private CivilianPharmacyRepository pharmacyRepository;

    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }

    public List<Pharmacy> searchPharmacies(String query, String filter, Double lat, Double lng) {
        List<Pharmacy> pharmacies;
        if (query != null && !query.isEmpty()) {
            pharmacies = pharmacyRepository.findByNameContainingIgnoreCase(query);
        } else {
            pharmacies = pharmacyRepository.findAll();
        }

        // Calculate distances if location provided
        if (lat != null && lng != null) {
            pharmacies.forEach(p -> {
                if (p.getLatitude() != null && p.getLongitude() != null) {
                    double dist = calculateHaversine(lat, lng, p.getLatitude(), p.getLongitude());
                    p.setDistance(Math.round(dist * 100.0) / 100.0);
                }
            });
        }

        // Apply filters
        if (filter != null) {
            switch (filter) {
                case "closest":
                    if (lat != null && lng != null) {
                        pharmacies.sort((p1, p2) -> Double.compare(
                                p1.getDistance() != null ? p1.getDistance() : Double.MAX_VALUE,
                                p2.getDistance() != null ? p2.getDistance() : Double.MAX_VALUE));
                    }
                    break;
                case "best-rated":
                    pharmacies.sort((p1, p2) -> Double.compare(
                            p2.getRating() != null ? p2.getRating() : 0.0,
                            p1.getRating() != null ? p1.getRating() : 0.0));
                    break;
                case "top-selling":
                    pharmacies.sort((p1, p2) -> {
                        boolean p1Top = "Top Selling".equalsIgnoreCase(p1.getBadge());
                        boolean p2Top = "Top Selling".equalsIgnoreCase(p2.getBadge());
                        return Boolean.compare(p2Top, p1Top);
                    });
                    break;
            }
        }
        return pharmacies;
    }

    @SuppressWarnings("null")
    public Pharmacy savePharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public List<Pharmacy> findNearbyPharmacies(double lat, double lng, double radius) {
        List<Pharmacy> pharmacies = pharmacyRepository.findNearby(lat, lng, radius);

        // Manually calculate/set distance since transient field might not be populated
        // by native query mapping
        pharmacies.forEach(p -> {
            if (p.getLatitude() != null && p.getLongitude() != null) {
                double dist = calculateHaversine(lat, lng, p.getLatitude(), p.getLongitude());
                p.setDistance(Math.round(dist * 100.0) / 100.0);
            }
        });

        return pharmacies;
    }

    private double calculateHaversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }
}
