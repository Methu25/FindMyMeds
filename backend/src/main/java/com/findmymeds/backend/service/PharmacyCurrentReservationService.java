package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.ReservationDTO;
import com.findmymeds.backend.model.Reservation;
import com.findmymeds.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PharmacyCurrentReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Long> getCurrentReservationCounts() {
        return List.of(
            reservationRepository.countByStatus("PENDING"),
            reservationRepository.countByStatus("CONFIRMED"),
            reservationRepository.countByStatus("ONGOING"),
            reservationRepository.countByStatus("READY"),
            reservationRepository.countByStatus("COLLECTED"),
            reservationRepository.countByStatus("CANCELLED")
        );
    }

    public List<ReservationDTO> getCurrentReservationsByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reservationRepository.findByStatus(status, pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void updateReservationStatus(Long id, String status) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        reservation.setStatus(status);
        reservationRepository.save(reservation);
    }

    public ReservationDTO getReservationDetails(Long id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        return convertToDTO(reservation);
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        // Conversion logic here
        return new ReservationDTO(); // Placeholder
    }
}
