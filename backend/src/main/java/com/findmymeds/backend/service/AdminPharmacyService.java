package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.PharmacyStatus;
import com.findmymeds.backend.repository.PharmacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminPharmacyService {

    private final PharmacyRepository pharmacyRepository;

    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }

    public List<Pharmacy> searchPharmacies(String query) {
        return pharmacyRepository.findByNameContainingIgnoreCase(query);
    }

    public List<Pharmacy> getPharmaciesByStatus(PharmacyStatus status) {
        return pharmacyRepository.findByStatus(status);
    }

    public Pharmacy savePharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public Pharmacy updatePharmacyStatus(Long id, PharmacyStatus status) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        pharmacy.setStatus(status);
        if (status == PharmacyStatus.REJECTED || status == PharmacyStatus.REMOVED
                || status == PharmacyStatus.SUSPENDED) {
            // Optional: logic to clear sensitive data or trigger emails
        }
        return pharmacyRepository.save(pharmacy);
    }
}
