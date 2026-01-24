package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.SystemSettingsDto;
import com.findmymeds.backend.service.PharmacySystemSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/settings")
@RequiredArgsConstructor
public class PharmacySystemSettingsController {

    private final PharmacySystemSettingsService pharmacySystemSettingsService;

    @GetMapping
    public ResponseEntity<SystemSettingsDto> getSettings() {
        Long pharmacyId = 1L; // Mock ID
        return ResponseEntity.ok(pharmacySystemSettingsService.getSettings(pharmacyId));
    }

    @PutMapping
    public ResponseEntity<Void> saveSettings(@RequestBody SystemSettingsDto settings) {
        Long pharmacyId = 1L; // Mock ID
        pharmacySystemSettingsService.saveSettings(pharmacyId, settings);
        return ResponseEntity.ok().build();
    }
}
