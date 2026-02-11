package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.ReservationDTO;
import com.findmymeds.backend.dto.ReservationItemDTO;
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
                reservationRepository.countByStatus("PENDING"),
                reservationRepository.countByStatus("CONFIRMED"),
                reservationRepository.countByStatus("ONGOING"),
                reservationRepository.countByStatus("READY"),
                reservationRepository.countByStatus("COLLECTED"),
                reservationRepository.countByStatus("CANCELLED"));
    }

    public List<ReservationDTO> getCurrentReservationsByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reservationRepository.findByStatus(status, pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void updateReservationStatus(@NonNull Long id, String status) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        reservation.setStatus(com.findmymeds.backend.model.enums.ReservationStatus.valueOf(status));
        reservationRepository.save(reservation);
    }

    public ReservationDTO getReservationDetails(@NonNull Long id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        return convertToDTO(reservation);
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        ReservationDTO dto = new ReservationDTO();
        dto.setId(reservation.getId());
        dto.setReservationCode(reservation.getReservationCode() != null ? reservation.getReservationCode()
                : "RES-" + reservation.getId());
        dto.setStatus(reservation.getStatus().name());
        dto.setReservationDate(reservation.getReservationDate().toString());
        dto.setPickupDate(reservation.getPickupDate() != null ? reservation.getPickupDate().toString() : "TBD");
        if (reservation.getCivilian() != null) {
            dto.setCivilianName(reservation.getCivilian().getFullName());
            dto.setCivilianEmail(reservation.getCivilian().getEmail());
            dto.setCivilianPhone(reservation.getCivilian().getPhone());
            dto.setCivilianLocation("Location Placeholder"); // Not in Civilian model yet
        }
        dto.setTotalMedicinesCount(reservation.getTotalMedicinesCount());
        dto.setTotalQuantity(reservation.getTotalQuantity());
        dto.setTotalAmount(reservation.getTotalAmount());

        if (reservation.getItems() != null) {
            dto.setItems(reservation.getItems().stream().map(item -> {
                ReservationItemDTO itemDto = new ReservationItemDTO();
                itemDto.setId(item.getId());
                itemDto.setMedicineName(item.getMedicine() != null ? item.getMedicine().getGenericName() : "Unknown");
                itemDto.setQuantity(item.getQuantity());
                itemDto.setPrice(item.getPrice());
                itemDto.setSubtotal(item.getPrice() != null ? item.getPrice() * item.getQuantity() : 0.0);
                return itemDto;
            }).collect(Collectors.toList()));
        }
        return dto;
    }
}
