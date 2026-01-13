package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.model.CivilianHistory;
import com.findmymeds.backend.model.enums.AccountStatus;
import com.findmymeds.backend.service.CivilianManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.lang.NonNull;

@RestController
@RequestMapping("/api/admin/civilians")
@CrossOrigin(origins = "*")
public class CivilianManagementController {

    @Autowired
    private CivilianManagementService civilianManagementService;

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Long>> getMetrics() {
        return ResponseEntity.ok(civilianManagementService.getMetrics());
    }

    @GetMapping
    public ResponseEntity<List<Civilian>> getCivilians(@RequestParam(required = false) AccountStatus status) {
        if (status != null) {
            return ResponseEntity.ok(civilianManagementService.getCiviliansByStatus(status));
        }
        // If no status provided, maybe return all? Or handling null in service?
        // Let's assume we want a specific status usually, but we can default to
        // something or return all if we implement findAll
        // For now, let's just default to returning empty list or implementing findAll
        // in service.
        // Better: require status or handle null
        // I will add findAll to service if needed, but for now I'll just return by
        // status if present.
        // Actually, the UI always filters.
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Civilian> getCivilian(@PathVariable Long id) {
        return civilianManagementService.getCivilianById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/ban/temp")
    public ResponseEntity<?> banTemp(@PathVariable Long id, @RequestParam String reason, @RequestParam Long adminId) {
        try {
            civilianManagementService.banCivilianTemporary(id, reason, adminId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/ban/perm")
    public ResponseEntity<?> banPerm(@PathVariable Long id, @RequestParam String reason, @RequestParam Long adminId) {
        try {
            civilianManagementService.banCivilianPermanent(id, reason, adminId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/activate")
    public ResponseEntity<?> activate(@PathVariable Long id, @RequestParam Long adminId) {
        try {
            civilianManagementService.activateCivilian(id, adminId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/mask")
    public ResponseEntity<?> maskData(@PathVariable Long id, @RequestParam Long adminId) {
        try {
            civilianManagementService.maskCivilianData(id, adminId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<CivilianHistory>> getHistory(@PathVariable Long id) {
        return ResponseEntity.ok(civilianManagementService.getCivilianHistory(id));
    }

    @Autowired
    private com.findmymeds.backend.repository.CivilianAppealRepository appealRepository;

    @GetMapping("/{id}/appeals")
    public ResponseEntity<?> getAppeals(@PathVariable Long id) {
        return ResponseEntity.ok(appealRepository.findByCivilianId(id));
    }

    @GetMapping("/appeals/{appealId}")
    public ResponseEntity<?> getAppeal(@PathVariable @NonNull Long appealId) {
        return ResponseEntity.ok(appealRepository.findById(appealId));
    }

    @PostMapping("/appeals/{appealId}/process")
    public ResponseEntity<?> processAppeal(@PathVariable Long appealId, @RequestParam boolean approved,
            @RequestParam String reason, @RequestParam Long adminId) {
        try {
            civilianManagementService.processAppeal(appealId, approved, reason, adminId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
