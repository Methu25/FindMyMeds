package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.PharmacyApplication;
import com.findmymeds.backend.service.PharmacyApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.lang.NonNull;

@RestController
@RequestMapping("/api/pharmacy-applications")
@CrossOrigin(origins = "http://localhost:5173")
public class PharmacyApplicationController {

    @Autowired
    private PharmacyApplicationService pharmacyApplicationService;

    @GetMapping
    public List<PharmacyApplication> getAllApplications() {
        return pharmacyApplicationService.getAllApplications();
    }

    @GetMapping("/by-status")
    public List<PharmacyApplication> getApplicationsByStatus(@RequestParam String status) {
        return pharmacyApplicationService.getApplicationsByStatus(status);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PharmacyApplication> getApplicationById(@PathVariable @NonNull Long id) {
        return pharmacyApplicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PharmacyApplication> createApplication(@RequestBody PharmacyApplication application) {
        return ResponseEntity.ok(pharmacyApplicationService.createApplication(application));
    }

    @PostMapping("/{id}/temp-approve")
    public ResponseEntity<PharmacyApplication> tempApproveApplication(@PathVariable @NonNull Long id) {
        return ResponseEntity.ok(pharmacyApplicationService.tempApproveApplication(id));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<PharmacyApplication> rejectApplication(@PathVariable @NonNull Long id,
            @RequestBody Map<String, Object> payload) {
        String reason = (String) payload.get("reason");
        // TODO: Get admin ID from session/token. Mocking for now.
        Long adminId = ((Number) payload.getOrDefault("adminId", 1)).longValue();
        return ResponseEntity.ok(pharmacyApplicationService.rejectApplication(id, reason, adminId));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Pharmacy> approveApplication(@PathVariable @NonNull Long id,
            @RequestBody Map<String, Object> payload) {
        // TODO: Get admin ID from session/token. Mocking for now.
        Long adminId = ((Number) payload.getOrDefault("adminId", 1)).longValue();
        return ResponseEntity.ok(pharmacyApplicationService.approveApplication(id, adminId));
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Long>> getMetrics() {
        return ResponseEntity.ok(Map.of(
                "total",
                pharmacyApplicationService.countByStatus("PENDING")
                        + pharmacyApplicationService.countByStatus("TEMP_APPROVED")
                        + pharmacyApplicationService.countByStatus("REJECTED")
                        + pharmacyApplicationService.countByStatus("APPROVED"),
                "pending", pharmacyApplicationService.countByStatus("PENDING"),
                "tempApproved", pharmacyApplicationService.countByStatus("TEMP_APPROVED"),
                "rejected", pharmacyApplicationService.countByStatus("REJECTED"),
                "approved", pharmacyApplicationService.countByStatus("APPROVED")));
    }
}
