package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.*;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.model.enums.PharmacyType;
import com.findmymeds.backend.model.enums.ReservationStatus;
import com.findmymeds.backend.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pharmacies")
@CrossOrigin(origins = "http://localhost:5173")
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    // --- Admin Endpoints ---

    @GetMapping
    public List<Pharmacy> getAllPharmacies() {
        return pharmacyService.getAllPharmacies();
    }

    @GetMapping("/by-status")
    public List<Pharmacy> getPharmaciesByStatus(@RequestParam PharmacyStatus status) {
        return pharmacyService.getPharmaciesByStatus(status);
    }

    @GetMapping("/by-type")
    public List<Pharmacy> getPharmaciesByType(@RequestParam PharmacyType type) {
        return pharmacyService.getPharmaciesByType(type);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pharmacy> getPharmacyById(@PathVariable long id) {
        return pharmacyService.getPharmacyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pharmacy> updatePharmacy(@PathVariable long id, @RequestBody Pharmacy pharmacy) {
        return ResponseEntity.ok(pharmacyService.updatePharmacy(id, pharmacy));
    }

    @PostMapping("/{id}/suspend")
    public ResponseEntity<Pharmacy> suspendPharmacy(@PathVariable long id) {
        return ResponseEntity.ok(pharmacyService.suspendPharmacy(id));
    }

    @PostMapping("/{id}/remove")
    public ResponseEntity<Pharmacy> removePharmacy(@PathVariable long id) {
        return ResponseEntity.ok(pharmacyService.removePharmacy(id));
    }

    @PostMapping("/{id}/activate")
    public ResponseEntity<Pharmacy> activatePharmacy(@PathVariable long id) {
        return ResponseEntity.ok(pharmacyService.activatePharmacy(id));
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Long>> getMetrics() {
        return ResponseEntity.ok(pharmacyService.getPharmacyMetrics());
    }

    // --- Client Portal Endpoints (Restored) ---

    @PostMapping("/register")
    public ResponseEntity<Pharmacy> registerPharmacy(@RequestBody Pharmacy pharmacy) {
        return ResponseEntity.ok(pharmacyService.registerPharmacy(pharmacy));
    }

    @PostMapping("/{id}/inventory")
    public ResponseEntity<PharmacyInventory> updateInventory(
            @PathVariable long id,
            @RequestParam long medicineId,
            @RequestParam Integer quantity,
            @RequestParam BigDecimal price) {
        return ResponseEntity.ok(pharmacyService.updateInventory(id, medicineId, quantity, price));
    }

    @GetMapping("/{id}/reservations")
    public ResponseEntity<List<Reservation>> getPharmacyReservations(@PathVariable long id) {
        return ResponseEntity.ok(pharmacyService.getPharmacyReservations(id));
    }

    @PatchMapping("/reservations/{reservationId}/status")
    public ResponseEntity<Reservation> updateReservationStatus(
            @PathVariable long reservationId,
            @RequestParam ReservationStatus status) {
        return ResponseEntity.ok(pharmacyService.updateReservationStatus(reservationId, status));
    }

    @PostMapping("/{id}/reports")
    public ResponseEntity<PharmacyReport> createReport(@PathVariable long id, @RequestBody PharmacyReport report) {
        return ResponseEntity.ok(pharmacyService.createReport(report, id));
    }
}
