package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.PharmacyReport;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.service.AdminPharmacyReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;

import java.util.List;

@RestController
@RequestMapping("/admin/pharmacy-reports")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminPharmacyReportController {

    @Autowired
    private AdminPharmacyReportService reportService;

    @GetMapping("/status/{status}")
    public List<PharmacyReport> getReportsByStatus(@PathVariable ReportStatus status) {
        return reportService.getReportsByStatus(status);
    }

    @GetMapping("/pharmacy/{pharmacyId}")
    public List<PharmacyReport> getReportsByPharmacy(@PathVariable @NonNull Long pharmacyId) {
        return reportService.getReportsByPharmacy(pharmacyId);
    }

    @PostMapping
    public PharmacyReport createReport(@RequestBody @NonNull PharmacyReport report) {
        return reportService.saveReport(report);
    }

    @PatchMapping("/{reportId}/status")
    public PharmacyReport updateReportStatus(@PathVariable @NonNull Long reportId,
            @RequestParam ReportStatus status) {
        return reportService.updateReportStatus(reportId, status);
    }
}
