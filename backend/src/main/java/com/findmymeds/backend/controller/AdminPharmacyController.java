package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.model.enums.PharmacyType;
import com.findmymeds.backend.service.AdminPharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/pharmacies")
public class AdminPharmacyController {

    @Autowired
    private AdminPharmacyService pharmacyService;

    @GetMapping
    public List<Pharmacy> getAllPharmacies() {
        return pharmacyService.getAllPharmacies();
    }

    @GetMapping("/search")
    public List<Pharmacy> searchPharmacies(@RequestParam String query) {
        return pharmacyService.searchPharmacies(query);
    }

    @GetMapping("/status/{status}")
    public List<Pharmacy> getPharmaciesByStatus(@PathVariable PharmacyStatus status) {
        return pharmacyService.getPharmaciesByStatus(status);
    }

    @PostMapping
    public Pharmacy createPharmacy(@RequestBody @org.springframework.lang.NonNull Pharmacy pharmacy) {
        return pharmacyService.savePharmacy(pharmacy);
    }

    @PatchMapping("/{id}/status")
    public Pharmacy updatePharmacyStatus(@PathVariable @org.springframework.lang.NonNull Long id,
            @RequestParam @org.springframework.lang.NonNull PharmacyStatus status) {
        return pharmacyService.updatePharmacyStatus(id, status);
    }
    @GetMapping("/api/pharmacies")
public List<Pharmacy> getPharmacies(
    @RequestParam(required = false) PharmacyStatus status,
    @RequestParam(required = false) PharmacyType type
) {
    return pharmacyService.getPharmacies(status, type);
}

}
