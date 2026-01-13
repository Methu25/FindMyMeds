package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.PharmacyProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacyProfileRepository extends JpaRepository<PharmacyProfile, Long> {
}
