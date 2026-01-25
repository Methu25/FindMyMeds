package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.pharmacy.id = :pharmacyId AND r.reservationDate >= :start AND r.reservationDate < :end")
    long countByPharmacyIdAndDateBetween(Long pharmacyId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.pharmacy.id = :pharmacyId AND r.status = :status AND r.reservationDate >= :start AND r.reservationDate < :end")
    long countByPharmacyIdAndStatusAndDateBetween(Long pharmacyId,
            com.findmymeds.backend.model.enums.ReservationStatus status, LocalDateTime start, LocalDateTime end);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.pharmacy.id = :pharmacyId AND r.status = 'PENDING'")
    long countPending(Long pharmacyId);
}
