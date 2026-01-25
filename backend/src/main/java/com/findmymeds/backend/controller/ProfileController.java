package com.findmymeds.backend.controller;

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

    @GetMapping
    public ResponseEntity<AdminResponse> getProfile() {
        AdminResponse admin = null;

        try {
            admin = adminService.getAdminById(1L); // may throw exception
        } catch (RuntimeException e) {
            // fallback to first admin
        }

        if (admin == null) {
            admin = adminService.getAllAdmins().stream().findFirst().orElse(null);
        }

        if (admin != null) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
