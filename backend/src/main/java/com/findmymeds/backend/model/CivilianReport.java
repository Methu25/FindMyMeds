package com.findmymeds.backend.model;

import com.findmymeds.backend.model.enums.IssueCategory;
import com.findmymeds.backend.model.enums.Priority;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.model.enums.ReportType;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "civilian_reports_inquiries")
public class CivilianReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_code")
    private String referenceCode;

    @ManyToOne
    @JoinColumn(name = "civilian_id")
    private Civilian civilian;

    @Enumerated(EnumType.STRING)
    private ReportType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "issue_category")
    private IssueCategory issueCategory;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "attachment_path")
    private String attachmentPath;

    @Enumerated(EnumType.STRING)
    private ReportStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "status_changed_at")
    private LocalDateTime statusChangedAt;

    @Column(columnDefinition = "TEXT", name = "admin_response")
    private String adminResponse;

    @Column(name = "admin_response_attachment")
    private String adminResponseAttachment;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "rejected_at")
    private LocalDateTime rejectedAt;

    // Manual Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferenceCode() {
        return referenceCode;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }

    public Civilian getCivilian() {
        return civilian;
    }

    public void setCivilian(Civilian civilian) {
        this.civilian = civilian;
    }

    public ReportType getType() {
        return type;
    }

    public void setType(ReportType type) {
        this.type = type;
    }

    public IssueCategory getIssueCategory() {
        return issueCategory;
    }

    public void setIssueCategory(IssueCategory issueCategory) {
        this.issueCategory = issueCategory;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAttachmentPath() {
        return attachmentPath;
    }

    public void setAttachmentPath(String attachmentPath) {
        this.attachmentPath = attachmentPath;
    }

    public ReportStatus getStatus() {
        return status;
    }

    public void setStatus(ReportStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getStatusChangedAt() {
        return statusChangedAt;
    }

    public void setStatusChangedAt(LocalDateTime statusChangedAt) {
        this.statusChangedAt = statusChangedAt;
    }

    public String getAdminResponse() {
        return adminResponse;
    }

    public void setAdminResponse(String adminResponse) {
        this.adminResponse = adminResponse;
    }

    public String getAdminResponseAttachment() {
        return adminResponseAttachment;
    }

    public void setAdminResponseAttachment(String adminResponseAttachment) {
        this.adminResponseAttachment = adminResponseAttachment;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public LocalDateTime getRejectedAt() {
        return rejectedAt;
    }

    public void setRejectedAt(LocalDateTime rejectedAt) {
        this.rejectedAt = rejectedAt;
    }
}
