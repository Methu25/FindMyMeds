package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Admin;
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
    public ResponseEntity<Admin> getProfile() {
        // Mock: Try to find ID 1, otherwise return the first available admin for demo
        // purposes
        return adminService.getAdminById(1L)
                .or(() -> adminService.getAllAdmins().stream().findFirst())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
