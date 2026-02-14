package com.findmymeds.backend.dto;

import com.findmymeds.backend.model.Medicine;

@Data
public class MedicineSearchResponse {
    private boolean medicineFound;
    private Medicine medicineDetails; // From Medicine Registry
    private List<PharmacyInventoryDTO> availablePharmacies; // Only quantity > 0
}
