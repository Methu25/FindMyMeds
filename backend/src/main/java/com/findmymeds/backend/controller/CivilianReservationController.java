package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Reservation;
import com.findmymeds.backend.service.CivilianReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")

public class CivilianReservationController {

    @Autowired
    private CivilianReservationService reservationService;

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/civilian/{civilianId}")
    public List<Reservation> getReservationsByCivilian(@PathVariable Long civilianId) {
        return reservationService.getReservationsByCivilian(civilianId);
    }

    // New Endpoints for Reservation Flow

    @GetMapping("/medicines/search")
    public List<com.findmymeds.backend.model.Medicine> searchMedicines(@RequestParam String name) {
        return reservationService.searchMedicines(name);
    }

    @PostMapping("/recommend-pharmacies")
    public List<java.util.Map<String, Object>> recommendPharmacies(@RequestBody java.util.Map<String, Object> request) {
        Long medicineId = Long.valueOf(request.get("medicineId").toString());
        Integer quantity = Integer.valueOf(request.get("requiredQuantity").toString());
        // String userLocation = (String) request.get("userLocation"); // Not used yet
        // in simple logic
        return reservationService.recommendPharmacies(medicineId, quantity);
    }

    @PostMapping("/confirm")
    public Reservation confirmReservation(@RequestBody java.util.Map<String, Object> request) {
        // Extract data
        Long civilianId = Long.valueOf(request.get("civilianId").toString()); // Assuming passed for now
        // In real app, get from Security Context

        Long medicineId = Long.valueOf(request.get("medicineId").toString());
        Long pharmacyId = Long.valueOf(request.get("pharmacyId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());
        String pickupDateStr = (String) request.get("pickupDate");
        String notes = (String) request.get("notes");
        String prescriptionFile = (String) request.get("prescriptionFile");

        java.time.LocalDate pickupDate = java.time.LocalDate.parse(pickupDateStr);

        return reservationService.confirmReservation(civilianId, medicineId, pharmacyId, quantity, pickupDate, notes,
                prescriptionFile);
    }
}
