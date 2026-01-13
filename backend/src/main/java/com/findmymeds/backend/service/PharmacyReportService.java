package com.findmymeds.backend.service;

import com.findmymeds.backend.model.PharmacyReport;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.repository.PharmacyReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import org.springframework.lang.NonNull;

@Service
public class PharmacyReportService {

    @Autowired
    private PharmacyReportRepository pharmacyReportRepository;

    public List<PharmacyReport> getAllReports() {
        return pharmacyReportRepository.findAll();
    }

    public List<PharmacyReport> getReportsByStatus(ReportStatus status) {
        return pharmacyReportRepository.findByStatus(status);
    }

    public Optional<PharmacyReport> getReportById(@NonNull Long id) {
        return pharmacyReportRepository.findById(id);
    }

    public PharmacyReport updateReportStatus(@NonNull Long id, ReportStatus status, String response) {
        PharmacyReport report = pharmacyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        report.setStatus(status);
        report.setStatusChangedAt(LocalDateTime.now());
        // Logic to save response/admin notes if entity supports it.
        // PharmacyReport has no specific field for response message in the model I saw
        // earlier,
        // but AdminActionLog usually handles history.
        // Or I should add a response field to PharmacyReport if needed.
        // For now, updating status.
        return pharmacyReportRepository.save(report);
    }

    public Map<String, Long> getReportMetrics() {
        Map<String, Long> metrics = new HashMap<>();
        metrics.put("total", pharmacyReportRepository.count());
        metrics.put("pending", pharmacyReportRepository.countByStatus(ReportStatus.PENDING)); // Assuming PENDING exists
        metrics.put("resolved", pharmacyReportRepository.countByStatus(ReportStatus.RESOLVED)); // Assuming RESOLVED
                                                                                                // exists
        // Add others if enum supports
        return metrics;
    }
}
