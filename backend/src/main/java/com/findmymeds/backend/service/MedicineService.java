package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Medicine;
import com.findmymeds.backend.model.AdminActionLog; // Added
import com.findmymeds.backend.repository.MedicineRepository;
import com.findmymeds.backend.repository.AdminActionLogRepository; // Added
import com.findmymeds.backend.repository.AdminRepository; // Added
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private AdminActionLogRepository adminActionLogRepository;

    @Autowired
    private AdminRepository adminRepository;

    // Helper to log actions
    private void logAction(String actionType, String description, Long targetId) {
        try {
            AdminActionLog log = new AdminActionLog();
            log.setActionType(actionType);
            log.setDescription(description);
            log.setTargetTable("medicines");
            log.setTargetId(targetId);

            // For now, since Auth is disabled, we'll try to assign to Admin ID 1 if exists,
            // or null
            // In a real scenario, we'd get the current user from SecurityContext
            adminRepository.findById(1L).ifPresent(log::setAdmin);

            adminActionLogRepository.save(log);
        } catch (Exception e) {
            System.err.println("Failed to save audit log: " + e.getMessage());
        }
    }

    // --- Stats / Metrics ---

    public Map<String, Object> getMedicineStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", medicineRepository.countByRemovedFalse());
        stats.put("active", medicineRepository.countByStatusAndRemovedFalse(Medicine.MedicineStatus.ACTIVE));
        stats.put("inactive", medicineRepository.countByStatusAndRemovedFalse(Medicine.MedicineStatus.INACTIVE));

        List<Object[]> typeCounts = medicineRepository.countTotalMedicinesByType();
        Map<String, Long> typeMap = new HashMap<>();
        for (Object[] result : typeCounts) {
            typeMap.put(((Medicine.MedicineType) result[0]).name(), (Long) result[1]);
        }
        stats.put("byType", typeMap);
        return stats;
    }

    // --- Retrieval (Filter & Search) ---

    public Page<Medicine> getAllMedicines(String search, Medicine.MedicineType type, Medicine.MedicineStatus status,
            Pageable pageable) {
        if (search != null && !search.isEmpty()) {
            if (type != null) {
                return medicineRepository.findByMedicineNameContainingIgnoreCaseAndTypeAndRemovedFalse(search, type,
                        pageable);
            } else if (status != null) {
                return medicineRepository.findByMedicineNameContainingIgnoreCaseAndStatusAndRemovedFalse(search,
                        status, pageable);
            } else {
                return medicineRepository.findByMedicineNameContainingIgnoreCaseAndRemovedFalse(search, pageable);
            }
        }

        if (type != null) {
            return medicineRepository.findByTypeAndRemovedFalse(type, pageable);
        }

        if (status != null) {
            return medicineRepository.findByStatusAndRemovedFalse(status, pageable);
        }

        return medicineRepository.findByRemovedFalse(pageable);
    }

    public Optional<Medicine> getMedicineById(@NonNull Long id) {
        return medicineRepository.findById(id).filter(m -> !m.isRemoved());
    }

    // --- CRUD Operations ---

    @Transactional
    @SuppressWarnings("null")
    public Medicine addMedicine(Medicine medicine) {
        // Validation logic can go here (e.g., check unique name if required)
        Medicine saved = medicineRepository.save(medicine);
        logAction("ADD_MEDICINE", "Added new medicine: " + saved.getMedicineName(), saved.getId());
        return saved;
    }

    @Transactional
    public Medicine updateMedicine(@NonNull Long id, Medicine updatedDetails) {
        return medicineRepository.findById(id)
                .map(existing -> {
                    existing.setMedicineName(updatedDetails.getMedicineName());
                    existing.setGenericName(updatedDetails.getGenericName());
                    existing.setType(updatedDetails.getType());
                    existing.setManufacturer(updatedDetails.getManufacturer());
                    existing.setCountryOfManufacture(updatedDetails.getCountryOfManufacture());
                    existing.setRegistrationNumber(updatedDetails.getRegistrationNumber());
                    existing.setImageUrl(updatedDetails.getImageUrl());
                    existing.setDosageForm(updatedDetails.getDosageForm());
                    existing.setStrength(updatedDetails.getStrength()); // Added missing mapping
                    existing.setStorageInstructions(updatedDetails.getStorageInstructions());
                    existing.setNotes(updatedDetails.getNotes());
                    existing.setDescription(updatedDetails.getDescription());
                    // Status is not updated here, usage specific method
                    Medicine saved = medicineRepository.save(existing);
                    logAction("UPDATE_MEDICINE", "Updated details for medicine: " + saved.getMedicineName(),
                            saved.getId());
                    return saved;
                })
                .orElseThrow(() -> new RuntimeException("Medicine not found with id " + id));
    }

    @Transactional
    public Medicine updateMedicineStatus(@NonNull Long id, Medicine.MedicineStatus status) {
        return medicineRepository.findById(id)
                .map(existing -> {
                    existing.setStatus(status);
                    Medicine saved = medicineRepository.save(existing);
                    logAction("UPDATE_STATUS",
                            "Changed status to " + status + " for medicine: " + saved.getMedicineName(), saved.getId());
                    return saved;
                })
                .orElseThrow(() -> new RuntimeException("Medicine not found with id " + id));
    }

    @Transactional
    public void softDeleteMedicine(@NonNull Long id) {
        medicineRepository.findById(id).ifPresent(existing -> {
            existing.setRemoved(true); // Assuming setter exists or Lombok generates it
            medicineRepository.save(existing);
            logAction("REMOVE_MEDICINE", "Soft deleted medicine: " + existing.getMedicineName(), existing.getId());
        });
    }
}
