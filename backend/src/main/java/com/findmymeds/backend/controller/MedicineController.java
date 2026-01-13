package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Medicine;
import com.findmymeds.backend.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    // Get Stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getMedicineStats() {
        return ResponseEntity.ok(medicineService.getMedicineStats());
    }

    // Get All Medicines with Filters
    @GetMapping
    public ResponseEntity<Page<Medicine>> getAllMedicines(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Medicine.MedicineType type,
            @RequestParam(required = false) Medicine.MedicineStatus status,
            Pageable pageable) {
        return ResponseEntity.ok(medicineService.getAllMedicines(search, type, status, pageable));
    }

    // Get Single Medicine
    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        return medicineService.getMedicineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add Medicine
    @PostMapping
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        return ResponseEntity.ok(medicineService.addMedicine(medicine));
    }

    // Update Medicine (Full Update)
    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicine) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        try {
            return ResponseEntity.ok(medicineService.updateMedicine(id, medicine));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update Medicine Status (Activate/Deactivate)
    @PatchMapping("/{id}/status")
    public ResponseEntity<Medicine> updateMedicineStatus(@PathVariable Long id,
            @RequestParam Medicine.MedicineStatus status) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        try {
            return ResponseEntity.ok(medicineService.updateMedicineStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Soft Delete Medicine
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDeleteMedicine(@PathVariable Long id) {
        if (id != null) {
            medicineService.softDeleteMedicine(id);
        }
        return ResponseEntity.noContent().build();
    }
}
