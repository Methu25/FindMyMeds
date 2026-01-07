package com.findmymeds.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "medicines")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "medicine_name", nullable = false)
    private String medicineName;

    @Column(name = "generic_name")
    private String genericName;

    @Enumerated(EnumType.STRING)
    @Column(name = "medicine_type", nullable = false)
    private MedicineType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private MedicineStatus status = MedicineStatus.ACTIVE;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "country_of_manufacture")
    private String countryOfManufacture;

    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "dosage_form")
    private String dosageForm;

    private String strength;

    @Column(name = "storage_instructions", columnDefinition = "TEXT")
    private String storageInstructions;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_removed")
    private boolean removed = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.lastUpdated = LocalDateTime.now();
    }

    public enum MedicineType {
        TABLET, CAPSULE, SYRUP, INJECTION, CREAM_OINTMENT, DROPS, INHALER, SUSPENSION, OTHER
    }

    public enum MedicineStatus {
        ACTIVE, INACTIVE
    }
}
