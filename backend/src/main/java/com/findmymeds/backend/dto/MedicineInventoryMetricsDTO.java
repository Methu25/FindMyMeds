package com.findmymeds.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MedicineInventoryMetricsDTO {
    private long totalMedicines;
    private long inStock;
    private long lowStock;
    private long outOfStock;
    private long expired;
    private long expiringSoon;
    private long deactivated;
}
