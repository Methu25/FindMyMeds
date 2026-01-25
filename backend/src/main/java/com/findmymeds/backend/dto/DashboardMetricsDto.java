package com.findmymeds.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardMetricsDTO {
    private long todaysReservations;
    private long completedToday;
    private long rejectedToday;
    private long inStockMedicines;
}
