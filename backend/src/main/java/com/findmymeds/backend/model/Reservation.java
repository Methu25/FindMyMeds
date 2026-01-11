package com.findmymeds.backend.model;

import com.findmymeds.backend.model.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reservation_code", unique = true)
    private String reservationCode;

    @ManyToOne
    @JoinColumn(name = "civilian_id")
    private Civilian civilian;

    @ManyToOne
    @JoinColumn(name = "pharmacy_id")
    private Pharmacy pharmacy;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    @Column(name = "pickup_date")
    private LocalDate pickupDate;

    @Column(name = "prescription_file")
    private String prescriptionFile;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "status_changed_at")
    private LocalDateTime statusChangedAt;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL)
    private List<ReservationItem> reservationItems;
}
