package com.findmymeds.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminOverviewSuperDTO {
    private long totalCivilians;
    private long totalAdmins;
    private long activeAdmins;
    private long totalPharmacies;
    private long pendingPharmacyApprovals;
}
