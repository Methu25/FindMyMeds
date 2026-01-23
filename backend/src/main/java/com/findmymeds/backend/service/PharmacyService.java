package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.repository.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }

    public List<Pharmacy> searchPharmacies(String query) {
        if (query == null || query.isEmpty()) {
            return pharmacyRepository.findAll();
        }
        return pharmacyRepository.findByNameContainingIgnoreCase(query);
    }

    @SuppressWarnings("null")
    public Pharmacy savePharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }
}
