package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.ReservationDTO;
import com.findmymeds.backend.model.Reservation;
import com.findmymeds.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PharmacyCurrentReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Long> getCurrentReservationCounts() {
        return List.of(
                reservationRepository.countByStatus(com.findmymeds.backend.model.enums.ReservationStatus.PENDING),
                reservationRepository.countByStatus(com.findmymeds.backend.model.enums.ReservationStatus.CONFIRMED),
                reservationRepository.countByStatus(com.findmymeds.backend.model.enums.ReservationStatus.ONGOING),
                reservationRepository.countByStatus(com.findmymeds.backend.model.enums.ReservationStatus.READY),
                reservationRepository.countByStatus(com.findmymeds.backend.model.enums.ReservationStatus.COLLECTED),
                reservationRepository.countByStatus(com.findmymeds.backend.model.enums.ReservationStatus.CANCELLED));
    }

    public List<ReservationDTO> getCurrentReservationsByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reservationRepository
                .findByStatus(com.findmymeds.backend.model.enums.ReservationStatus.valueOf(status), pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void updateReservationStatus(@NonNull String id, String status) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        reservation.setStatus(com.findmymeds.backend.model.enums.ReservationStatus.valueOf(status));
        reservationRepository.save(reservation);
    }

    public ReservationDTO getReservationDetails(@NonNull String id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        return convertToDTO(reservation);
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        // Conversion logic here
        return new ReservationDTO(); // Placeholder
    }
}
