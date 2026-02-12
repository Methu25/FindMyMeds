package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.ReservationDTO;
import com.findmymeds.backend.service.PharmacyCurrentReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacy/reservations/current")
public class PharmacyCurrentReservationController {

    @Autowired
    private PharmacyCurrentReservationService reservationService;

    @GetMapping("/counts")
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<List<Long>> getCurrentReservationCounts() {
        return ResponseEntity.ok(reservationService.getCurrentReservationCounts());
    }

    @GetMapping
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<List<ReservationDTO>> getCurrentReservations(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        if (status == null) {
            // Frontend call without params -> return all current
            return ResponseEntity.ok(reservationService.getAllCurrentReservations(1L)); // Mock pharmacy ID 1L
        }
        return ResponseEntity.ok(reservationService.getCurrentReservationsByStatus(status, page, size));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<Void> updateReservationStatus(@PathVariable @NonNull String id, @RequestParam String status) {
        reservationService.updateReservationStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<ReservationDTO> getReservationDetails(@PathVariable @NonNull String id) {
        return ResponseEntity.ok(reservationService.getReservationDetails(id));
    }
}
