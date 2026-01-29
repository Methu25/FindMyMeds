package com.findmymeds.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pharmacy_name")
    private String name;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @Column(name = "operating_hours")
    private String operatingHours;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PharmacyStatus status;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Transient
    private Double distance; // Optional, for UI purposes

}
