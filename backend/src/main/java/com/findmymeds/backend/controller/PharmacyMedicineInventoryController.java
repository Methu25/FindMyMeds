package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.MedicineDetailDTO;
import com.findmymeds.backend.dto.MedicineInventoryDTO;
import com.findmymeds.backend.dto.MedicineInventoryMetricsDTO;
import com.findmymeds.backend.service.PharmacyMedicineInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/inventory")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" }, allowCredentials = "true")
public class PharmacyMedicineInventoryController {

    @Autowired
    private PharmacyMedicineInventoryService inventoryService;

    @GetMapping("/metrics")
    public ResponseEntity<MedicineInventoryMetricsDTO> getMetrics() {
        return ResponseEntity.ok(inventoryService.getInventoryMetrics());
    }

    @GetMapping
    public ResponseEntity<Page<MedicineInventoryDTO>> getInventory(
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(inventoryService.getInventory(filter, search, page, size));
    }

    @GetMapping("/{medicineId}")
    public ResponseEntity<MedicineDetailDTO> getMedicineDetails(@PathVariable Long medicineId) {
        return ResponseEntity.ok(inventoryService.getMedicineDetails(medicineId));
    }
}
