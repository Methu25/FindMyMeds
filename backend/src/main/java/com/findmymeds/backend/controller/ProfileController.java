package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.AdminNotFoundException;
import com.findmymeds.backend.model.AdminResponse;
import com.findmymeds.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
@RequiredArgsConstructor
public class ProfileController {

    private final AdminService adminService;

    // Simulate getting the "current" logged-in user (hardcoded ID 1 for now)
    @GetMapping
    public ResponseEntity<AdminResponse> getProfile() {
        // Mock: Try to find ID 1, otherwise return the first available admin for demo
        // purposes
        try {
            AdminResponse admin = adminService.getAdminById(1L);
            return ResponseEntity.ok(admin);
        } catch (AdminNotFoundException e) {
            // If admin with ID 1 not found, try to get the first admin
            return adminService.getAllAdmins().stream()
                    .findFirst()
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
    }
}
