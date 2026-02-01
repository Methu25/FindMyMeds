package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.repository.AdminPharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminPharmacyService {

    @Autowired
    private AdminPharmacyRepository pharmacyRepository;

    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }

    public Pharmacy getPharmacyById(@org.springframework.lang.NonNull Long id) {
        return pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
    }

    public Pharmacy savePharmacy(@org.springframework.lang.NonNull Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public Pharmacy updatePharmacyStatus(@org.springframework.lang.NonNull Long id, PharmacyStatus status) {
        Pharmacy pharmacy = getPharmacyById(id);
        pharmacy.setStatus(status);
        return pharmacyRepository.save(pharmacy);
    }

    public List<Pharmacy> searchPharmacies(String query) {
        if (query == null || query.isEmpty()) {
            return pharmacyRepository.findAll();
        }
        return pharmacyRepository.findByNameContainingIgnoreCase(query);
    }

    public List<Pharmacy> getPharmaciesByStatus(PharmacyStatus status) {
        return pharmacyRepository.findByStatus(status);
    }
}