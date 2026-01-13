package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.*;
import com.findmymeds.backend.model.enums.AppealStatus;
import com.findmymeds.backend.model.enums.BanType;
import com.findmymeds.backend.model.enums.AdminStatus;
import com.findmymeds.backend.model.AdminActivityLog;
import com.findmymeds.backend.service.AdminService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register") // Initial setup helper
    public ResponseEntity<Admin> register(@RequestBody Admin admin) {
        // Assuming 0L or similar for self-registration/system init
        return ResponseEntity.ok(adminService.createAdmin(admin, 1L));
    }

    @PostMapping("/civilians/ban")
    public ResponseEntity<?> banCivilian(@RequestBody Map<String, Object> payload) {
        Long civilianId = ((Number) payload.get("civilianId")).longValue();
        String typeStr = (String) payload.get("banType");
        BanType type = BanType.valueOf(typeStr);
        adminService.banCivilian(civilianId, type);
        return ResponseEntity.ok("Civilian banned successfully");
    }

    @PostMapping("/civilians/unban")
    public ResponseEntity<?> unbanCivilian(@RequestParam Long civilianId) {
        adminService.unbanCivilian(civilianId);
        return ResponseEntity.ok("Civilian unbanned successfully");
    }

    @PostMapping("/appeals/resolve")
    public ResponseEntity<CivilianAppeal> resolveAppeal(@RequestBody Map<String, Object> payload) {
        Long appealId = ((Number) payload.get("appealId")).longValue();
        String statusStr = (String) payload.get("status");
        AppealStatus status = AppealStatus.valueOf(statusStr);
        return ResponseEntity.ok(adminService.resolveAppeal(appealId, status));
    }

    @PostMapping("/pharmacies/verify")
    public ResponseEntity<?> verifyPharmacy(@RequestParam Long pharmacyId, @RequestParam Boolean verified) {
        adminService.verifyPharmacy(pharmacyId, verified);
        return ResponseEntity.ok("Pharmacy verification status updated");
    }

    @PostMapping("/medicine/add")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        return ResponseEntity.ok(adminService.addMedicine(medicine));
    }

    // --- Admin Management System ---

    // Metrics
    @GetMapping("/management/metrics")
    public ResponseEntity<Map<String, Long>> getMetrics() {
        return ResponseEntity.ok(adminService.getAdminMetrics());
    }

    // LIST ALL ADMINS
    @GetMapping("/management")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    // Create Admin
    @PostMapping("/management")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin, @RequestParam Long creatorId) {
        return ResponseEntity.ok(adminService.createAdmin(admin, creatorId));
    }

    // Get Admin Details
    @GetMapping("/management/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdminById(id));
    }

    // Update Admin (Full)
    @PutMapping("/management/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin admin,
            @RequestParam Long updaterId) {
        return ResponseEntity.ok(adminService.updateAdmin(id, admin, updaterId));
    }

    // Update Email Only
    @PatchMapping("/management/{id}/email")
    public ResponseEntity<Admin> updateAdminEmail(@PathVariable Long id, @RequestParam String email,
            @RequestParam Long updaterId) {
        return ResponseEntity.ok(adminService.updateAdminEmail(id, email, updaterId));
    }

    // Change Status
    @PatchMapping("/management/{id}/status")
    public ResponseEntity<Void> changeStatus(@PathVariable Long id, @RequestParam AdminStatus status,
            @RequestParam Long updaterId) {
        adminService.changeAdminStatus(id, status, updaterId);
        return ResponseEntity.ok().build();
    }

    // Get Logs
    @GetMapping("/management/{id}/logs")
    public ResponseEntity<List<AdminActivityLog>> getLogs(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdminActivityLogs(id));
    }
}
