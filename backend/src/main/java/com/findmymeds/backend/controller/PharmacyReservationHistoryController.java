package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.ReservationDTO;
import com.findmymeds.backend.service.PharmacyReservationHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacy/reservations/history")
public class PharmacyReservationHistoryController {

    @Autowired
    private PharmacyReservationHistoryService reservationHistoryService;

    @GetMapping("/counts")
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<List<Long>> getReservationHistoryCounts() {
        return ResponseEntity.ok(reservationHistoryService.getReservationHistoryCounts());
    }

    @GetMapping
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<List<ReservationDTO>> getReservationHistory(
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        if (type == null) {
            return ResponseEntity.ok(reservationHistoryService.getAllHistory(1L));
        }
        return ResponseEntity.ok(reservationHistoryService.getReservationHistoryByType(type, page, size));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<ReservationDTO> getReservationHistoryDetails(@PathVariable @NonNull String id) {
        return ResponseEntity.ok(reservationHistoryService.getReservationHistoryDetails(id));
    }
}
