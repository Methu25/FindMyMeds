package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Medicine;
import com.findmymeds.backend.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public List<Medicine> searchMedicines(@RequestParam(required = false) String query) {
        return medicineService.searchMedicines(query);
    }
}
