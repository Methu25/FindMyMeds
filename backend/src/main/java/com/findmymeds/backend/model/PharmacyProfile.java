package com.findmymeds.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pharmacy_profiles")
public class PharmacyProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "pharmacy_id", referencedColumnName = "id")
    private Pharmacy pharmacy;

    @Column(name = "logo_path")
    private String logoPath;

    @Column(name = "license_document")
    private String licenseDocument;

    private Boolean verified;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
