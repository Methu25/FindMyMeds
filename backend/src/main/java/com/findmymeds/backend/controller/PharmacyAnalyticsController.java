package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.PharmacyAnalyticsDto;
import com.findmymeds.backend.service.PharmacyAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/data-summary")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" }, allowCredentials = "true")
public class PharmacyAnalyticsController {

    private final PharmacyAnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<PharmacyAnalyticsDto> getPharmacyAnalytics() {
        Long pharmacyId = 1L; // Mock ID, usually from Auth Context
        return ResponseEntity.ok(analyticsService.getPharmacyAnalytics(pharmacyId));
    }
}
