package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.model.enums.PharmacyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
    Optional<Pharmacy> findByLicenseNumber(String licenseNumber);

    List<Pharmacy> findByStatus(PharmacyStatus status);

    List<Pharmacy> findByPharmacyType(PharmacyType pharmacyType);

    long countByStatus(PharmacyStatus status);

    long countByPharmacyType(PharmacyType pharmacyType);
}
