package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Reservation;
import com.findmymeds.backend.model.enums.ReservationStatus;
import com.findmymeds.backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pharmacy/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PharmacyReservationController {

    private final ReservationRepository reservationRepository;

    private Long getCurrentPharmacyId() {
        return 1L; // Mock for development
    }

    @GetMapping("/current")
    public ResponseEntity<List<Reservation>> getCurrentReservations() {
        Long pharmacyId = getCurrentPharmacyId();
        List<Reservation> all = reservationRepository.findAll();
        List<Reservation> filtered = all.stream()
                .filter(r -> r.getPharmacy() != null && r.getPharmacy().getId().equals(pharmacyId))
                .filter(r -> r.getStatus() == ReservationStatus.PENDING ||
                        r.getStatus() == ReservationStatus.CONFIRMED ||
                        r.getStatus() == ReservationStatus.READY)
                .collect(Collectors.toList());
        return ResponseEntity.ok(filtered);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Reservation>> getReservationHistory() {
        Long pharmacyId = getCurrentPharmacyId();
        List<Reservation> all = reservationRepository.findAll();
        List<Reservation> filtered = all.stream()
                .filter(r -> r.getPharmacy() != null && r.getPharmacy().getId().equals(pharmacyId))
                .filter(r -> r.getStatus() == ReservationStatus.COLLECTED ||
                        r.getStatus() == ReservationStatus.CANCELLED)
                .collect(Collectors.toList());
        return ResponseEntity.ok(filtered);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable String id, @RequestParam ReservationStatus status) {
        if (id == null)
            return ResponseEntity.badRequest().build();

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        reservation.setStatus(status);
        reservationRepository.save(reservation);
        return ResponseEntity.ok().build();
    }
}
