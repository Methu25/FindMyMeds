package com.findmymeds.backend.service;

import com.findmymeds.backend.model.AdminNotFoundException; // Ensure this is imported
import com.findmymeds.backend.model.*;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.repository.AdminReportRepository;
import com.findmymeds.backend.repository.AdminRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminReportService {

    private final AdminReportRepository reportRepository;
    private final AdminRepository adminRepository;
    private final ObjectMapper objectMapper;

    // Get all reports (Super Admin)
    public List<ReportResponse> getAllReports() {
        return reportRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get reports by status
    public List<ReportResponse> getReportsByStatus(ReportStatus status) {
        return reportRepository.findByStatusOrderByCreatedAtDesc(status).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get reports by admin (for regular admin to see their own)
    public List<ReportResponse> getReportsByAdmin(Long adminId) {
        // CORRECTION 1: Use the updated Repository method name
        return reportRepository.findBySubmittedByAdminIdOrderByCreatedAtDesc(adminId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get report by ID
    public ReportResponse getReportById(Long id) {
        AdminReportInquiry report = reportRepository.findById(id)
                .orElseThrow(() -> new AdminNotFoundException("Report not found with id: " + id));
        return mapToResponse(report);
    }

    // Get metrics
    public ReportMetricsResponse getMetrics() {
        long total = reportRepository.count();
        long pending = reportRepository.countByStatus(ReportStatus.PENDING);
        long ongoing = reportRepository.countByStatus(ReportStatus.IN_PROGRESS);
        long resolved = reportRepository.countByStatus(ReportStatus.RESOLVED);
        long rejected = reportRepository.countByStatus(ReportStatus.REJECTED);

        return new ReportMetricsResponse(total, pending, ongoing, resolved, rejected);
    }

    // Create new report/inquiry (Admin only)
    @Transactional
    public ReportResponse createReport(CreateReportRequest request, Long adminId) {
        AdminReportInquiry report = new AdminReportInquiry();

        // CORRECTION 2: Map to Entity field 'submittedByAdminId'
        report.setSubmittedByAdminId(adminId);

        report.setType(request.getType());
        report.setTitle(request.getTitle());
        report.setCategory(request.getCategory());
        report.setPriority(request.getPriority());

        // CORRECTION 3: Map DTO 'details' to Entity 'description'
        report.setDescription(request.getDetails());

        // Convert attachments list to JSON string
        if (request.getAttachments() != null && !request.getAttachments().isEmpty()) {
            try {
                report.setAttachments(objectMapper.writeValueAsString(request.getAttachments()));
            } catch (Exception e) {
                report.setAttachments("[]");
            }
        }

        report.setStatus(ReportStatus.PENDING);

        AdminReportInquiry savedReport = reportRepository.save(report);
        return mapToResponse(savedReport);
    }

    // Update report status (Super Admin only)
    @Transactional
    public ReportResponse updateReportStatus(Long reportId, UpdateReportStatusRequest request) {
        AdminReportInquiry report = reportRepository.findById(reportId)
                .orElseThrow(() -> new AdminNotFoundException("Report not found with id: " + reportId));

        report.setStatus(request.getStatus());

        AdminReportInquiry updatedReport = reportRepository.save(report);
        return mapToResponse(updatedReport);
    }

    // Helper: Map entity to response
    private ReportResponse mapToResponse(AdminReportInquiry report) {
        ReportResponse response = new ReportResponse();
        response.setId(report.getId());

        // CORRECTION 4: Map Entity 'submittedByAdminId' to DTO 'adminId'
        response.setAdminId(report.getSubmittedByAdminId());

        // Get admin name
        adminRepository.findById(report.getSubmittedByAdminId())
                .ifPresent(admin -> response.setAdminName(admin.getFullName()));

        response.setType(report.getType());
        response.setTitle(report.getTitle());
        response.setCategory(report.getCategory());
        response.setPriority(report.getPriority());

        // CORRECTION 5: Map Entity 'description' to DTO 'details'
        response.setDetails(report.getDescription());

        response.setStatus(report.getStatus());
        response.setCreatedAt(report.getCreatedAt());
        response.setUpdatedAt(report.getUpdatedAt());

        // Parse attachments JSON to list
        if (report.getAttachments() != null) {
            try {
                List<String> attachments = objectMapper.readValue(
                        report.getAttachments(),
                        objectMapper.getTypeFactory().constructCollectionType(List.class, String.class)
                );
                response.setAttachments(attachments);
            } catch (Exception e) {
                response.setAttachments(Collections.emptyList());
            }
        } else {
            response.setAttachments(Collections.emptyList());
        }

        return response;
    }
}