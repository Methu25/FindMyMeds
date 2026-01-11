package com.findmymeds.backend.model;

import com.findmymeds.backend.model.enums.PharmacyType;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pharmacy_applications")
public class PharmacyApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pharmacy_name")
    private String pharmacyName;

    @Enumerated(EnumType.STRING)
    @Column(name = "pharmacy_type")
    private PharmacyType pharmacyType;

    @Column(name = "license_number", unique = true)
    private String licenseNumber;

    @Column(name = "owner_name")
    private String ownerName;

    private String email;

    private String phone;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String district;

    @Column(columnDefinition = "TEXT")
    private String documents; // JSON string or comma-separated URLs

    @Column(name = "application_status")
    private String applicationStatus; // PENDING, TEMP_APPROVED, REJECTED, APPROVED

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "rejected_by")
    private Long rejectedBy; // Admin ID

    @Column(name = "rejected_at")
    private LocalDateTime rejectedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
// Force recompile
