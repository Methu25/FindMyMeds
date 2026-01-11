package com.findmymeds.backend.model;

import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.model.enums.PharmacyType;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pharmacies")
public class Pharmacy {
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

    @Column(name = "operating_hours")
    private String operatingHours;

    @Enumerated(EnumType.STRING)
    private PharmacyStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "approved_by")
    private Long approvedBy; // Admin ID

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;
}
