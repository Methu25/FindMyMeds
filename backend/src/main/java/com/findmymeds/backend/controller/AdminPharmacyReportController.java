package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.PharmacyReport;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.service.PharmacyReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/pharmacy-reports")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminPharmacyReportController {

    @Autowired
    private PharmacyReportService pharmacyReportService;

    @GetMapping
    public List<PharmacyReport> getAllReports() {
        return pharmacyReportService.getAllReports();
    }

    @GetMapping("/by-status")
    public List<PharmacyReport> getReportsByStatus(@RequestParam ReportStatus status) {
        return pharmacyReportService.getReportsByStatus(status);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PharmacyReport> getReportById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        return pharmacyReportService.getReportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PharmacyReport> updateReportStatus(
            @PathVariable Long id,
            @RequestParam ReportStatus status,
            @RequestParam(required = false) String response) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(pharmacyReportService.updateReportStatus(id, status, response));
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Long>> getMetrics() {
        return ResponseEntity.ok(pharmacyReportService.getReportMetrics());
    }
}
