package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.DashboardMetricsDto;
import com.findmymeds.backend.service.PharmacyDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/dashboard")
@RequiredArgsConstructor
<<<<<<< HEAD
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" }, allowCredentials = "true")
public class PharmacyDashboardController {

    private final PharmacyDashboardService dashboardService;

    @GetMapping("/metrics")
    public ResponseEntity<DashboardMetricsDto> getDashboardMetrics() {
        // Using hardcoded ID 1 to match existing pharmacy development logic
        Long pharmacyId = 1L;
        return ResponseEntity.ok(dashboardService.getMetrics(pharmacyId));
=======
@CrossOrigin(origins = "http://localhost:5173")
public class PharmacyDashboardController {

    private final PharmacyDashboardService pharmacyDashboardService;

    @GetMapping("/metrics")
    public ResponseEntity<DashboardMetricsDto> getMetrics() {
        Long pharmacyId = 1L; // Mock ID for now, usually from Auth Context
        return ResponseEntity.ok(pharmacyDashboardService.getMetrics(pharmacyId));
>>>>>>> origin
    }
}
