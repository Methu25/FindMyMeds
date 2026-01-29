package com.findmymeds.backend.model;

import jakarta.persistence.*;
import com.findmymeds.backend.model.Civilian;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import com.findmymeds.backend.model.enums.ReservationStatus;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Pharmacy pharmacy;

    @ManyToOne
    private Civilian civilian;

    private Double totalAmount;
    private LocalDateTime reservationDate;
    private String timeframe; // e.g. "10:00 AM - 6:00 PM"

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "reservation")
    private List<ReservationItem> items;
}
