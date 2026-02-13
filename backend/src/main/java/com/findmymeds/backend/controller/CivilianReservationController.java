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
}
