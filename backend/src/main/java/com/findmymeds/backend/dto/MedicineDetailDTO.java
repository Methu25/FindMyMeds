package com.findmymeds.backend.dto;

import com.findmymeds.backend.model.Medicine.MedicineType;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class MedicineDetailDTO {
    private Long inventoryId;
    private Long medicineId;
    private String medicineName;
    private String genericName;
    private String activeIngredients;
    private MedicineType type;
    private String manufacturer;
    private String countryOfManufacture;
    private String registrationNumber;
    private String dosageForm;
    private String strength;
    private String storageInstructions;
    private String description;
    private boolean requiresPrescription;
    private String imageUrl;

    // Inventory specific
    private Integer availableQuantity;
    private BigDecimal price;
    private String status;
    private LocalDate expiryDate;
    private String batchNumber;
    private String approvalStatus; // From Medicine.approvalStatus
}
