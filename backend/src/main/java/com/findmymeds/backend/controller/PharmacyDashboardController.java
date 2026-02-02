package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.DashboardMetricsDTO;
import com.findmymeds.backend.service.PharmacyDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PharmacyDashboardController {

    private final PharmacyDashboardService pharmacyDashboardService;

    @GetMapping("/metrics")
    public ResponseEntity<DashboardMetricsDTO> getMetrics() {
        Long pharmacyId = 1L; // Mock ID for now, usually from Auth Context
        return ResponseEntity.ok(pharmacyDashboardService.getMetrics(pharmacyId));
    }
}
