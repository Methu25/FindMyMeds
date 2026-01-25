package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.PharmacyReport;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.service.AdminPharmacyReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/pharmacy-reports")
public class AdminPharmacyReportController {

    @Autowired
    private AdminPharmacyReportService reportService;

    @GetMapping("/status/{status}")
    public List<PharmacyReport> getReportsByStatus(@PathVariable ReportStatus status) {
        return reportService.getReportsByStatus(status);
    }

    @GetMapping("/pharmacy/{pharmacyId}")
    public List<PharmacyReport> getReportsByPharmacy(@PathVariable @org.springframework.lang.NonNull Long pharmacyId) {
        return reportService.getReportsByPharmacy(pharmacyId);
    }

    @PostMapping
    public PharmacyReport createReport(@RequestBody @org.springframework.lang.NonNull PharmacyReport report) {
        return reportService.saveReport(report);
    }

    @PatchMapping("/{reportId}/status")
    public PharmacyReport updateReportStatus(@PathVariable @org.springframework.lang.NonNull Long reportId,
            @RequestParam ReportStatus status) {
        return reportService.updateReportStatus(reportId, status);
    }
}
