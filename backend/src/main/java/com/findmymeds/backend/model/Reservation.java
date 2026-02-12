package com.findmymeds.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import com.findmymeds.backend.model.enums.ReservationStatus;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reservationCode;

    @ManyToOne
    private Pharmacy pharmacy;

    @ManyToOne
    private Civilian civilian;

    private Double totalAmount;
    private Integer totalQuantity;
    private Integer totalMedicinesCount;
    private java.time.LocalDateTime reservationDate;
    private java.time.LocalDate pickupDate;
    private String timeframe; // e.g. "10:00 AM - 6:00 PM"
    private String prescriptionImageUrl;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "reservation")
    private List<ReservationItem> items;
}
