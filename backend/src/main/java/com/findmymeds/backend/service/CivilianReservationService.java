package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Reservation;
import com.findmymeds.backend.repository.CivilianReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CivilianReservationService {

    @Autowired
    private CivilianReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        // JPA with IDENTITY strategy will handle ID generation
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

    public List<Reservation> getReservationsByCivilian(Long civilianId) {
        return reservationRepository.findByCivilianId(civilianId);
    }
}
