package com.findmymeds.backend.dto;

import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.model.enums.ReportType;
import com.findmymeds.backend.model.enums.IssueCategory;
import com.findmymeds.backend.model.enums.Priority;
import lombok.Data; // Keep @Data but manually add Builder

import java.time.LocalDateTime;

@Data
public class AdminCivilianReportRowDTO {
    private Long id;
    private String referenceCode;

    private ReportType type;
    private ReportStatus status;
    private IssueCategory issueCategory;
    private Priority priority;

    private String title;

    private Long civilianId;
    private String civilianName;

    private LocalDateTime createdAt;
    private LocalDateTime statusChangedAt;

    public AdminCivilianReportRowDTO() {
    }

    public AdminCivilianReportRowDTO(Long id, String referenceCode, ReportType type, ReportStatus status,
            IssueCategory issueCategory, Priority priority, String title, Long civilianId, String civilianName,
            LocalDateTime createdAt, LocalDateTime statusChangedAt) {
        this.id = id;
        this.referenceCode = referenceCode;
        this.type = type;
        this.status = status;
        this.issueCategory = issueCategory;
        this.priority = priority;
        this.title = title;
        this.civilianId = civilianId;
        this.civilianName = civilianName;
        this.createdAt = createdAt;
        this.statusChangedAt = statusChangedAt;
    }

    public static AdminCivilianReportRowDTOBuilder builder() {
        return new AdminCivilianReportRowDTOBuilder();
    }

    public static class AdminCivilianReportRowDTOBuilder {
        private Long id;
        private String referenceCode;
        private ReportType type;
        private ReportStatus status;
        private IssueCategory issueCategory;
        private Priority priority;
        private String title;
        private Long civilianId;
        private String civilianName;
        private LocalDateTime createdAt;
        private LocalDateTime statusChangedAt;

        AdminCivilianReportRowDTOBuilder() {
        }

        public AdminCivilianReportRowDTOBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder referenceCode(String referenceCode) {
            this.referenceCode = referenceCode;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder type(ReportType type) {
            this.type = type;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder status(ReportStatus status) {
            this.status = status;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder issueCategory(IssueCategory issueCategory) {
            this.issueCategory = issueCategory;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder priority(Priority priority) {
            this.priority = priority;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder title(String title) {
            this.title = title;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder civilianId(Long civilianId) {
            this.civilianId = civilianId;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder civilianName(String civilianName) {
            this.civilianName = civilianName;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public AdminCivilianReportRowDTOBuilder statusChangedAt(LocalDateTime statusChangedAt) {
            this.statusChangedAt = statusChangedAt;
            return this;
        }

        public AdminCivilianReportRowDTO build() {
            return new AdminCivilianReportRowDTO(id, referenceCode, type, status, issueCategory, priority, title,
                    civilianId, civilianName, createdAt, statusChangedAt);
        }

        public String toString() {
            return "AdminCivilianReportRowDTO.AdminCivilianReportRowDTOBuilder(id=" + this.id + ", referenceCode="
                    + this.referenceCode + ", type=" + this.type + ", status=" + this.status + ", issueCategory="
                    + this.issueCategory + ", priority=" + this.priority + ", title=" + this.title + ", civilianId="
                    + this.civilianId + ", civilianName=" + this.civilianName + ", createdAt=" + this.createdAt
                    + ", statusChangedAt=" + this.statusChangedAt + ")";
        }
    }
}
