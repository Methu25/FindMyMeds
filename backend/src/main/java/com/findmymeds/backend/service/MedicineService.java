package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.MedicineSearchResponse;
import com.findmymeds.backend.dto.PharmacyInventoryDTO;
import com.findmymeds.backend.model.Medicine;
import com.findmymeds.backend.model.PharmacyInventory;
import com.findmymeds.backend.repository.MedicineRepository;
import com.findmymeds.backend.repository.PharmacyInventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final PharmacyInventoryRepository pharmacyInventoryRepository;

    public MedicineSearchResponse getUnifiedSearch(String name) {
        MedicineSearchResponse response = new MedicineSearchResponse();

        Optional<Medicine> medicineOpt = medicineRepository.findByMedicineNameIgnoreCaseAndRemovedFalse(name);

        if (medicineOpt.isPresent()) {
            Medicine medicine = medicineOpt.get();
            response.setMedicineFound(true);
            response.setMedicineDetails(medicine);

            // Find pharmacies with stock > 0
            List<PharmacyInventory> inventories = pharmacyInventoryRepository.findPharmaciesWithStock(medicine.getId(),
                    1);

            // Map to DTO
            List<PharmacyInventoryDTO> pharmacyDTOs = inventories.stream()
                    .map(inv -> new PharmacyInventoryDTO(
                            inv.getPharmacy().getId(),
                            inv.getPharmacy().getName(),
                            inv.getPharmacy().getDistrict(), // Mapping district to city
                            inv.getPharmacy().getPhone(),
                            inv.getAvailableQuantity()))
                    .collect(Collectors.toList());

            response.setAvailablePharmacies(pharmacyDTOs);
        } else {
            response.setMedicineFound(false);
            response.setMedicineDetails(null);
            response.setAvailablePharmacies(Collections.emptyList());
        }

        return response;
    }
}
