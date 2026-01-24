package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.PharmacyInventory;
import com.findmymeds.backend.service.AdminPharmacyInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/pharmacy-inventories")
public class AdminPharmacyInventoryController {

    @Autowired
    private AdminPharmacyInventoryService inventoryService;

    @GetMapping("/pharmacy/{pharmacyId}")
    public List<PharmacyInventory> getInventoryByPharmacy(@PathVariable Long pharmacyId) {
        return inventoryService.getInventoryByPharmacy(pharmacyId);
    }

    @PostMapping
    public PharmacyInventory addInventory(@RequestBody PharmacyInventory inventory) {
        return inventoryService.saveInventory(inventory);
    }

    @PutMapping
    public PharmacyInventory updateInventory(@RequestBody PharmacyInventory inventory) {
        return inventoryService.updateInventory(inventory);
    }
}
