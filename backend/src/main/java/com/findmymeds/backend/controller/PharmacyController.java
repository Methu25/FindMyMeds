package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    @GetMapping
    public List<Pharmacy> searchPharmacies(@RequestParam(required = false) String query) {
        return pharmacyService.searchPharmacies(query);
    }
}
