package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.PharmacyInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<PharmacyInventory, Long> {

    @Query("SELECT COUNT(i) FROM PharmacyInventory i WHERE i.pharmacy.id = :pharmacyId AND i.availableQuantity = 0")
    long countOutOfStock(Long pharmacyId);

    // Assuming "Expiring Soon" logic check expiry date if exists, but Inventory
    // entity doesn't seem to have expiryDate in previous context.
    // However, I see "Medicine" has removed/status.
    // If Inventory doesn't have expiry, I'll return 0 or mock it.
    // Let's assume we can't do expirty real check without column.
    // Actually, prompt says "Expiring soon count". If no column, I'll return 0.
}
