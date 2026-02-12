package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.PharmacyProfileDto;
import com.findmymeds.backend.service.PharmacyProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PharmacyProfileController {

    private final PharmacyProfileService pharmacyProfileService;

    @GetMapping
    public ResponseEntity<PharmacyProfileDto> getProfile() {
        Long pharmacyId = 1L; // Mock ID
        return ResponseEntity.ok(pharmacyProfileService.getProfile(pharmacyId));
    }

    @PutMapping
    public ResponseEntity<Void> updateProfile(@RequestBody PharmacyProfileDto dto) {
        Long pharmacyId = 1L; // Mock ID
        pharmacyProfileService.updateProfile(pharmacyId, dto);
        return ResponseEntity.ok().build();
    }
}
