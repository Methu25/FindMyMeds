package com.findmymeds.backend.service;

import com.findmymeds.backend.model.PharmacyApplication;
import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.repository.PharmacyApplicationRepository;
import com.findmymeds.backend.repository.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.lang.NonNull;

@Service
public class PharmacyApplicationService {

    @Autowired
    private PharmacyApplicationRepository pharmacyApplicationRepository;

    @Autowired
    private PharmacyRepository pharmacyRepository;

    public List<PharmacyApplication> getAllApplications() {
        return pharmacyApplicationRepository.findAll();
    }

    public List<PharmacyApplication> getApplicationsByStatus(String status) {
        return pharmacyApplicationRepository.findByApplicationStatus(status);
    }

    public Optional<PharmacyApplication> getApplicationById(@NonNull Long id) {
        return pharmacyApplicationRepository.findById(id);
    }

    public PharmacyApplication createApplication(PharmacyApplication application) {
        application.setApplicationStatus("PENDING");
        return pharmacyApplicationRepository.save(application);
    }

    public PharmacyApplication tempApproveApplication(@NonNull Long id) {
        PharmacyApplication application = pharmacyApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setApplicationStatus("TEMP_APPROVED");
        return pharmacyApplicationRepository.save(application);
    }

    public PharmacyApplication rejectApplication(@NonNull Long id, String reason, Long adminId) {
        PharmacyApplication application = pharmacyApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setApplicationStatus("REJECTED");
        application.setRejectionReason(reason);
        application.setRejectedBy(adminId);
        application.setRejectedAt(LocalDateTime.now());
        return pharmacyApplicationRepository.save(application);
    }

    @Transactional
    public Pharmacy approveApplication(@NonNull Long id, Long adminId) {
        PharmacyApplication application = pharmacyApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!"TEMP_APPROVED".equals(application.getApplicationStatus())) {
            throw new RuntimeException("Application must be temporarily approved first");
        }

        // Create new Pharmacy
        Pharmacy pharmacy = new Pharmacy();
        pharmacy.setPharmacyName(application.getPharmacyName());
        pharmacy.setPharmacyType(application.getPharmacyType());
        pharmacy.setLicenseNumber(application.getLicenseNumber());
        pharmacy.setOwnerName(application.getOwnerName());
        pharmacy.setEmail(application.getEmail());
        pharmacy.setPhone(application.getPhone());
        pharmacy.setAddress(application.getAddress());
        pharmacy.setDistrict(application.getDistrict());
        pharmacy.setStatus(PharmacyStatus.ACTIVE);
        pharmacy.setApprovedBy(adminId);
        pharmacy.setApprovedAt(LocalDateTime.now());

        pharmacyRepository.save(pharmacy);

        // Update application status
        application.setApplicationStatus("APPROVED");
        pharmacyApplicationRepository.save(application);

        return pharmacy;
    }

    public long countByStatus(String status) {
        return pharmacyApplicationRepository.countByApplicationStatus(status);
    }
}
