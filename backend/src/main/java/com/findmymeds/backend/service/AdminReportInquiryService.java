package com.findmymeds.backend.service;

import com.findmymeds.backend.model.AdminReportInquiry;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.repository.AdminReportInquiryRepository;
import com.findmymeds.backend.repository.AdminActivityLogRepository;
import com.findmymeds.backend.model.AdminActivityLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

@Service
@Transactional
public class AdminReportInquiryService {

    @Autowired
    private AdminReportInquiryRepository reportRepository;

    @Autowired
    private AdminActivityLogRepository activityLogRepository;

    private static final String UPLOAD_DIR = "uploads/admin_reports/";

    public AdminReportInquiry createReport(AdminReportInquiry report, Long adminId, MultipartFile[] files)
            throws IOException {
        report.setSubmittedByAdminId(adminId);
        report.setStatus(ReportStatus.PENDING);

        if (files != null && files.length > 0) {
            List<String> filePaths = saveFiles(files);
            ObjectMapper mapper = new ObjectMapper();
            report.setAttachments(mapper.writeValueAsString(filePaths));
        }

        return reportRepository.save(report);
    }

    private List<String> saveFiles(MultipartFile[] files) throws IOException {
        List<String> fileNames = new ArrayList<>();
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        for (MultipartFile file : files) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            fileNames.add(fileName);
        }
        return fileNames;
    }

    public Map<String, Long> getReportMetrics() {
        Map<String, Long> metrics = new HashMap<>();
        metrics.put("pending", reportRepository.countByStatus(ReportStatus.PENDING));
        metrics.put("ongoing", reportRepository.countByStatus(ReportStatus.IN_PROGRESS)); // Mapped to IN_PROGRESS
        metrics.put("resolved", reportRepository.countByStatus(ReportStatus.RESOLVED));
        metrics.put("rejected", reportRepository.countByStatus(ReportStatus.REJECTED));
        return metrics;
    }

    public Page<AdminReportInquiry> getReports(ReportStatus status, @NonNull Pageable pageable) {
        if (status != null) {
            return reportRepository.findByStatus(status, pageable);
        }
        return reportRepository.findAll(pageable);
    }

    public AdminReportInquiry getReportById(@NonNull Long id) {
        return reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
    }

    public AdminReportInquiry updateReportStatus(@NonNull Long id, ReportStatus newStatus, Long adminId, String notes) {
        AdminReportInquiry report = getReportById(id);

        // Basic transition validation can be added here

        report.setStatus(newStatus);
        if (notes != null) {
            report.setInternalNotes(notes);
        }

        if (newStatus == ReportStatus.RESOLVED) {
            report.setResolvedAt(LocalDateTime.now());
        } else if (newStatus == ReportStatus.REJECTED) {
            report.setRejectedAt(LocalDateTime.now());
        }

        AdminReportInquiry saved = reportRepository.save(report);

        // Log activity
        logActivity(adminId, "Update Report Status: " + newStatus, null); // Target ID could be report ID if schema
                                                                          // allows, but currently targetAdminId
        return saved;
    }

    public AdminReportInquiry updateInternalNotes(@NonNull Long id, String notes, Long adminId) {
        AdminReportInquiry report = getReportById(id);
        report.setInternalNotes(notes);
        return reportRepository.save(report);
    }

    // Auto-delete resolved/rejected reports older than 60 days
    // Run at 1 AM every day: 0 0 1 * * ?
    @Scheduled(cron = "0 0 1 * * ?")
    public void scheduleReportCleanup() {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(60);
        reportRepository.deleteOldResolvedOrRejected(cutoffDate);
        // Could log this system action
    }

    private void logActivity(Long adminId, String action, Long targetAdminId) {
        AdminActivityLog log = new AdminActivityLog();
        log.setAdminId(adminId);
        log.setAction(action);
        log.setTargetAdminId(targetAdminId);
        activityLogRepository.save(log);
    }
}
