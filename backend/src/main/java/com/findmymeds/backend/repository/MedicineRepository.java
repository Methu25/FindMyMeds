package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

        // Count by Status
        long countByStatusAndRemovedFalse(Medicine.MedicineStatus status);

        // Total not removed
        long countByRemovedFalse();

        // Count by Type
        long countByTypeAndRemovedFalse(Medicine.MedicineType type);

        // Find all active/inactive not removed
        Page<Medicine> findByStatusAndRemovedFalse(Medicine.MedicineStatus status, Pageable pageable);

        // Find by Type not removed
        Page<Medicine> findByTypeAndRemovedFalse(Medicine.MedicineType type, Pageable pageable);

        // Find all not removed
        Page<Medicine> findByRemovedFalse(Pageable pageable);

        // Search by name
        Page<Medicine> findByMedicineNameContainingIgnoreCaseAndRemovedFalse(String name, Pageable pageable);

        // Find by Name and Type
        Page<Medicine> findByMedicineNameContainingIgnoreCaseAndTypeAndRemovedFalse(String name,
                        Medicine.MedicineType type, Pageable pageable);

        // Find by Name and Status
        Page<Medicine> findByMedicineNameContainingIgnoreCaseAndStatusAndRemovedFalse(String name,
                        Medicine.MedicineStatus status, Pageable pageable);

        @Query("SELECT m.type, COUNT(m) FROM Medicine m WHERE m.removed = false GROUP BY m.type")
        List<Object[]> countTotalMedicinesByType();
}
