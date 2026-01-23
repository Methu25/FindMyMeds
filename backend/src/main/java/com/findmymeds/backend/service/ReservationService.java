package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Reservation;
import com.findmymeds.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        if (reservation.getId() == null) {
            reservation.setId(UUID.randomUUID().toString());
        }
        reservation.setReservationDate(LocalDateTime.now());
        // Calculate total amount if needed, or trust frontend
        // Persist items logic might be needed here to link back reference if not
        // handled by Cascade
        if (reservation.getItems() != null) {
            reservation.getItems().forEach(item -> item.setReservation(reservation));
        }
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
