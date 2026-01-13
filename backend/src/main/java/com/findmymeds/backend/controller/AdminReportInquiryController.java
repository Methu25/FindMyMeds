package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.AdminReportInquiry;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.service.AdminReportInquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import com.findmymeds.backend.model.enums.ReportCategory;
import com.findmymeds.backend.model.enums.ReportType;
import com.findmymeds.backend.model.enums.Priority;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/reports")
@CrossOrigin(origins = "*")
public class AdminReportInquiryController {

    @Autowired
    private AdminReportInquiryService reportService;

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Long>> getMetrics() {
        return ResponseEntity.ok(reportService.getReportMetrics());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdminReportInquiry> createReport(
            @RequestParam("adminId") Long adminId,
            @RequestParam("title") String title,
            @RequestParam("type") ReportType type,
            @RequestParam("category") ReportCategory category,
            @RequestParam("priority") Priority priority,
            @RequestParam("details") String details,
            @RequestParam(value = "attachments", required = false) MultipartFile[] attachments) {

        AdminReportInquiry report = new AdminReportInquiry();
        report.setTitle(title);
        report.setType(type);
        report.setCategory(category);
        report.setPriority(priority);
        report.setDescription(details);

        try {
            return ResponseEntity.ok(reportService.createReport(report, adminId, attachments));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<AdminReportInquiry>> getReports(@RequestParam(required = false) ReportStatus status,
            @NonNull Pageable pageable) {
        return ResponseEntity.ok(reportService.getReports(status, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminReportInquiry> getReportById(@PathVariable long id) {
        return ResponseEntity.ok(reportService.getReportById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AdminReportInquiry> updateStatus(
            @PathVariable long id,
            @RequestParam ReportStatus status,
            @RequestParam Long adminId,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(reportService.updateReportStatus(id, status, adminId, notes));
    }

    @PatchMapping("/{id}/notes")
    public ResponseEntity<AdminReportInquiry> updateNotes(
            @PathVariable long id,
            @RequestBody String notes,
            @RequestParam Long adminId) {
        return ResponseEntity.ok(reportService.updateInternalNotes(id, notes, adminId));
    }
}
