package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.ReservationDTO;
import com.findmymeds.backend.service.PharmacyCurrentReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<ReservationDTO>> getCurrentReservations(@RequestParam String status, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(reservationService.getCurrentReservationsByStatus(status, page, size));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<Void> updateReservationStatus(@PathVariable Long id, @RequestParam String status) {
        reservationService.updateReservationStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PHARMACY')")
    public ResponseEntity<ReservationDTO> getReservationDetails(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getReservationDetails(id));
    }
}
