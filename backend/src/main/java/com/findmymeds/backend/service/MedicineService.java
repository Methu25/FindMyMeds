package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Medicine;
import com.findmymeds.backend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> searchMedicines(String query) {
        if (query == null || query.isEmpty()) {
            return medicineRepository.findAll();
        }
        return medicineRepository.findByNameContainingIgnoreCase(query);
    }

    public Medicine saveMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }
}
