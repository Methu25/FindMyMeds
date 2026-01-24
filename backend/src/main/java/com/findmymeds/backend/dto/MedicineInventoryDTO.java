package com.findmymeds.backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class MedicineInventoryDTO {
    private Long inventoryId;
    private Long medicineId;
    private String medicineName;
    private String genericName;
    private String manufacturer;
    private Integer stockQuantity;
    private BigDecimal price;
    private String status; // Derived from Medicine status or stock level
    private String imageUrl;
}
