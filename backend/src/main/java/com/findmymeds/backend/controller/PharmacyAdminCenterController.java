package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.PharmacyProfileDto;
import com.findmymeds.backend.dto.ReportRequestDto;
import com.findmymeds.backend.service.PharmacyAdminCenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy")
@RequiredArgsConstructor
public class PharmacyAdminCenterController {

    private final PharmacyAdminCenterService pharmacyAdminCenterService;

    @GetMapping("/profile")
    public ResponseEntity<PharmacyProfileDto> getProfile() {
        Long pharmacyId = 1L; // Mock ID
        return ResponseEntity.ok(pharmacyAdminCenterService.getProfile(pharmacyId));
    }

    @PostMapping("/reports")
    public ResponseEntity<Void> submitReport(@RequestBody ReportRequestDto report) {
        Long pharmacyId = 1L; // Mock ID
        pharmacyAdminCenterService.submitReport(pharmacyId, report);
        return ResponseEntity.ok().build();
    }
}
