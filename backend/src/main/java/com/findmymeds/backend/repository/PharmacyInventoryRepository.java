package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Medicine;
import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.PharmacyInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PharmacyInventoryRepository extends JpaRepository<PharmacyInventory, Long> {
    Optional<PharmacyInventory> findByPharmacyAndMedicine(Pharmacy pharmacy, Medicine medicine);
}
