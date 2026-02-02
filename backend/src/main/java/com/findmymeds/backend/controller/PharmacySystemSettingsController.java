package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.SystemSettingsDTO;
import com.findmymeds.backend.service.PharmacySystemSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/settings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Standard Vite port
public class PharmacySystemSettingsController {

    private final PharmacySystemSettingsService pharmacySystemSettingsService;

    @GetMapping
    public ResponseEntity<SystemSettingsDTO> getSettings() {
        Long pharmacyId = 1L; // Mock ID
        return ResponseEntity.ok(pharmacySystemSettingsService.getSettings(pharmacyId));
    }

    @PutMapping
    public ResponseEntity<Void> saveSettings(@RequestBody SystemSettingsDTO settings) {
        Long pharmacyId = 1L; // Mock ID
        pharmacySystemSettingsService.saveSettings(pharmacyId, settings);
        return ResponseEntity.ok().build();
    }
}
