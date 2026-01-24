package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.PharmacyInventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacyInventoryRepository extends JpaRepository<PharmacyInventory, Long> {

    @Query("SELECT pi FROM PharmacyInventory pi WHERE pi.pharmacy.id = :pharmacyId AND " +
            "(:search IS NULL OR LOWER(pi.medicine.medicineName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(pi.medicine.genericName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<PharmacyInventory> findByPharmacyIdAndSearch(@Param("pharmacyId") Long pharmacyId,
            @Param("search") String search,
            Pageable pageable);

    // Metrics Queries
    long countByPharmacyId(Long pharmacyId);

    @Query("SELECT COUNT(pi) FROM PharmacyInventory pi WHERE pi.pharmacy.id = :pharmacyId AND pi.availableQuantity > 10")
    long countInStock(@Param("pharmacyId") Long pharmacyId);

    @Query("SELECT COUNT(pi) FROM PharmacyInventory pi WHERE pi.pharmacy.id = :pharmacyId AND pi.availableQuantity > 0 AND pi.availableQuantity <= 10")
    long countLowStock(@Param("pharmacyId") Long pharmacyId);

    @Query("SELECT COUNT(pi) FROM PharmacyInventory pi WHERE pi.pharmacy.id = :pharmacyId AND pi.availableQuantity = 0")
    long countOutOfStock(@Param("pharmacyId") Long pharmacyId);

    // Note: Expired/Expiring Soon queries skipped as expiry date is missing in
    // entity. Service will handle this limitation.

    @Query("SELECT COUNT(pi) FROM PharmacyInventory pi WHERE pi.pharmacy.id = :pharmacyId AND pi.medicine.status = 'INACTIVE'")
    long countDeactivated(@Param("pharmacyId") Long pharmacyId);
}
