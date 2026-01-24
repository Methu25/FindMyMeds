package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.*;
import com.findmymeds.backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity getAdminById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdminById(id));
    }

    @GetMapping("/metrics")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity getMetrics() {
        return ResponseEntity.ok(adminService.getMetrics());
    }

    @PostMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity createAdmin(
            @Valid @RequestBody CreateAdminRequest request,
            Authentication authentication) {

        Long currentAdminId = getCurrentAdminId(authentication);
        AdminResponse response = adminService.createAdmin(request, currentAdminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{id}/email")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity updateAdminEmail(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAdminEmailRequest request,
            Authentication authentication) {

        Long currentAdminId = getCurrentAdminId(authentication);
        AdminResponse response = adminService.updateAdminEmail(id, request, currentAdminId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity deleteAdmin(
            @PathVariable Long id,
            Authentication authentication) {

        Long currentAdminId = getCurrentAdminId(authentication);
        adminService.deleteAdmin(id, currentAdminId);
        return ResponseEntity.noContent().build();
    }

    private Long getCurrentAdminId(Authentication authentication) {
        return Long.parseLong(authentication.getName());
    }
}