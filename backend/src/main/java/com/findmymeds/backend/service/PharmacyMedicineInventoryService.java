package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.MedicineDetailDTO;
import com.findmymeds.backend.dto.MedicineInventoryDTO;
import com.findmymeds.backend.dto.MedicineInventoryMetricsDTO;
import com.findmymeds.backend.model.Medicine;
import com.findmymeds.backend.model.PharmacyInventory;
import com.findmymeds.backend.repository.PharmacyInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PharmacyMedicineInventoryService {

    @Autowired
    private PharmacyInventoryRepository inventoryRepository;

    private Long getCurrentPharmacyId() {
        return 1L; // Hardcoded for development
    }

    public MedicineInventoryMetricsDTO getInventoryMetrics() {
        Long pharmacyId = getCurrentPharmacyId();

        return MedicineInventoryMetricsDTO.builder()
                .totalMedicines(inventoryRepository.countByPharmacyId(pharmacyId))
                .inStock(inventoryRepository.countInStock(pharmacyId))
                .lowStock(inventoryRepository.countLowStock(pharmacyId))
                .outOfStock(inventoryRepository.countOutOfStock(pharmacyId))
                .expired(0)
                .expiringSoon(0)
                .deactivated(inventoryRepository.countDeactivated(pharmacyId))
                .build();
    }

    public Page<MedicineInventoryDTO> getInventory(String filter, String search, int page, int size) {
        Long pharmacyId = getCurrentPharmacyId();

        // Note: 'filter' parameter is not fully implemented in Repository yet as the
        // request was generic.
        // If specific filters (e.g. "LOW_STOCK") are needed, the repository generic
        // search/filter can be expanded.
        // For now using the search functionality.

        Pageable pageable = PageRequest.of(page, size);
        Page<PharmacyInventory> inventoryPage = inventoryRepository.findByPharmacyIdAndSearch(pharmacyId, search,
                pageable);

        return inventoryPage.map(this::mapToDTO);
    }

    public MedicineDetailDTO getMedicineDetails(Long medicineId) {
        // Here medicineId refers to the PharmacyInventory's ID based on the API
        // specific requirement "GET /inventory/{medicineId}"
        // Usually {medicineId} would imply the ID from Medicine table, but context
        // implies managing inventory.
        // Assuming the ID passed is the ID of the Inventory item
        // (PharmacyInventory.id).

        PharmacyInventory inventory = inventoryRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + medicineId));

        return mapToDetailDTO(inventory);
    }

    private MedicineInventoryDTO mapToDTO(PharmacyInventory inventory) {
        MedicineInventoryDTO dto = new MedicineInventoryDTO();
        dto.setInventoryId(inventory.getId());
        dto.setMedicineId(inventory.getMedicine().getId());
        dto.setMedicineName(inventory.getMedicine().getMedicineName());
        dto.setGenericName(inventory.getMedicine().getGenericName());
        dto.setManufacturer(inventory.getMedicine().getManufacturer());
        dto.setStockQuantity(inventory.getAvailableQuantity());
        dto.setPrice(inventory.getPrice());
        dto.setImageUrl(inventory.getMedicine().getImageUrl());

        // Determine status
        if (inventory.getMedicine().getStatus() == Medicine.MedicineStatus.INACTIVE) {
            dto.setStatus("Deactivated");
        } else if (inventory.getAvailableQuantity() == 0) {
            dto.setStatus("Out of Stock");
        } else if (inventory.getAvailableQuantity() <= 10) {
            dto.setStatus("Low Stock");
        } else {
            dto.setStatus("In Stock");
        }

        return dto;
    }

    private MedicineDetailDTO mapToDetailDTO(PharmacyInventory inventory) {
        Medicine medicine = inventory.getMedicine();
        MedicineDetailDTO dto = new MedicineDetailDTO();

        dto.setInventoryId(inventory.getId());
        dto.setMedicineId(medicine.getId());
        dto.setMedicineName(medicine.getMedicineName());
        dto.setGenericName(medicine.getGenericName());
        dto.setType(medicine.getType());
        dto.setManufacturer(medicine.getManufacturer());
        dto.setCountryOfManufacture(medicine.getCountryOfManufacture());
        dto.setRegistrationNumber(medicine.getRegistrationNumber());
        dto.setDosageForm(medicine.getDosageForm());
        dto.setStrength(medicine.getStrength());
        dto.setStorageInstructions(medicine.getStorageInstructions());
        dto.setDescription(medicine.getDescription());
        dto.setRequiresPrescription(medicine.isRequiresPrescription());
        dto.setImageUrl(medicine.getImageUrl());

        dto.setAvailableQuantity(inventory.getAvailableQuantity());
        dto.setPrice(inventory.getPrice());

        if (medicine.getStatus() == Medicine.MedicineStatus.INACTIVE) {
            dto.setStatus("Deactivated");
        } else if (inventory.getAvailableQuantity() == 0) {
            dto.setStatus("Out of Stock");
        } else if (inventory.getAvailableQuantity() <= 10) {
            dto.setStatus("Low Stock");
        } else {
            dto.setStatus("In Stock");
        }

        return dto;
    }
}
