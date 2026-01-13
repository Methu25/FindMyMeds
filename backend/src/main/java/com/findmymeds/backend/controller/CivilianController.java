package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.LoginRequest;
import com.findmymeds.backend.model.*;
import com.findmymeds.backend.model.enums.UserType;
import com.findmymeds.backend.service.CivilianService;
import com.findmymeds.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/civilian")
@CrossOrigin(origins = "*")
public class CivilianController {

    @Autowired
    private CivilianService civilianService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/register")
    public ResponseEntity<Civilian> register(@RequestBody Civilian civilian) {
        return ResponseEntity.ok(civilianService.registerCivilian(civilian));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Placeholder for real auth
        return civilianService.findByEmail(loginRequest.getEmail())
                .map(civilian -> {
                    // Check password hash match here using BCrypt
                    return ResponseEntity.ok("Login Successful (Token Placeholder)");
                })
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }

    @PostMapping("/reservations")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation,
            @RequestParam Long civilianId) {
        // Assuming items are passed in reservation object or handled separately
        return ResponseEntity
                .ok(civilianService.createReservation(reservation, civilianId, reservation.getReservationItems()));
    }

    @GetMapping("/reservations/history")
    public ResponseEntity<List<Reservation>> getHistory(@RequestParam Long civilianId) {
        return ResponseEntity.ok(civilianService.getReservationHistory(civilianId));
    }

    @PostMapping("/report-inquiry")
    public ResponseEntity<CivilianReport> createReport(@RequestBody CivilianReport report,
            @RequestParam Long civilianId) {
        return ResponseEntity.ok(civilianService.createReport(report, civilianId));
    }

    @PostMapping("/appeal")
    public ResponseEntity<CivilianAppeal> createAppeal(@RequestBody CivilianAppeal appeal,
            @RequestParam Long civilianId) {
        return ResponseEntity.ok(civilianService.createAppeal(appeal, civilianId));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications(@RequestParam Long civilianId) {
        return ResponseEntity.ok(notificationService.getUserNotifications(civilianId, UserType.CIVILIAN));
    }
}
