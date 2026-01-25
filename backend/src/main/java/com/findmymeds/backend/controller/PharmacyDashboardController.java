package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.DashboardMetricsDTO;
import com.findmymeds.backend.service.PharmacyDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pharmacy/dashboard")
@RequiredArgsConstructor
public class PharmacyDashboardController {

    private final PharmacyDashboardService pharmacyDashboardService;

    @GetMapping("/metrics")
    public ResponseEntity<DashboardMetricsDTO> getMetrics() {
        // In a real secure app, we extract pharmacyId from JWT token.
        // For now, hardcoding ID 1 or assuming Auth util usage (mocked).
        // Long pharmacyId = getAuthenticatedPharmacyId();
        Long pharmacyId = 1L; // Mock ID
        return ResponseEntity.ok(pharmacyDashboardService.getMetrics(pharmacyId));
    }
}
