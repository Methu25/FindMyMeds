package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.AdminReportInquiry;
import com.findmymeds.backend.model.enums.ReportStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface AdminReportInquiryRepository extends JpaRepository<AdminReportInquiry, Long> {
    Page<AdminReportInquiry> findByStatus(ReportStatus status, Pageable pageable);

    long countByStatus(ReportStatus status);

    // For auto-deletion logic
    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.transaction.annotation.Transactional
    @Query("DELETE FROM AdminReportInquiry r WHERE (r.status = 'RESOLVED' AND r.resolvedAt < :cutoffDate) OR (r.status = 'REJECTED' AND r.rejectedAt < :cutoffDate)")
    void deleteOldResolvedOrRejected(LocalDateTime cutoffDate);
}
