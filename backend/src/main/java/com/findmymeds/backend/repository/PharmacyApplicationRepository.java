package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.PharmacyApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PharmacyApplicationRepository extends JpaRepository<PharmacyApplication, Long> {
    List<PharmacyApplication> findByApplicationStatus(String applicationStatus);

    long countByApplicationStatus(String applicationStatus);
}
