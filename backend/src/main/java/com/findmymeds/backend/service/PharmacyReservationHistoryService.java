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
public class PharmacyReservationHistoryService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Long> getReservationHistoryCounts() {
        return List.of(
                reservationRepository.countByStatus("COLLECTED"),
                reservationRepository.countByStatus("EXPIRED"),
                reservationRepository.countByStatus("CANCELLED"));
    }

    public List<ReservationDTO> getReservationHistoryByType(String type, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reservationRepository.findByStatus(type, pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReservationDTO getReservationHistoryDetails(@NonNull String id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        return convertToDTO(reservation);
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        // Conversion logic here
        return new ReservationDTO(); // Placeholder
    }
}
