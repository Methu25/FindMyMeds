package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.PharmacyInventory;
import com.findmymeds.backend.model.Medicine;
import com.findmymeds.backend.model.Reservation;
import com.findmymeds.backend.model.PharmacyReport;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.model.enums.PharmacyType;
import com.findmymeds.backend.model.enums.ReservationStatus;
import com.findmymeds.backend.model.enums.ReportStatus;
import com.findmymeds.backend.repository.PharmacyRepository;
import com.findmymeds.backend.repository.PharmacyInventoryRepository;
import com.findmymeds.backend.repository.ReservationRepository;
import com.findmymeds.backend.repository.PharmacyReportRepository;
import com.findmymeds.backend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@Service
public class PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired(required = false)
    private PharmacyInventoryRepository pharmacyInventoryRepository;

    @Autowired(required = false)
    private ReservationRepository reservationRepository;

    @Autowired
    private PharmacyReportRepository pharmacyReportRepository;

    @Autowired(required = false)
    private MedicineRepository medicineRepository;

    // --- Admin Management Methods ---

    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }

    public List<Pharmacy> getPharmaciesByStatus(PharmacyStatus status) {
        return pharmacyRepository.findByStatus(status);
    }

    public List<Pharmacy> getPharmaciesByType(PharmacyType type) {
        return pharmacyRepository.findByPharmacyType(type);
    }

    public Optional<Pharmacy> getPharmacyById(@NonNull Long id) {
        return pharmacyRepository.findById(id);
    }

    @SuppressWarnings("null")
    public Pharmacy updatePharmacy(@NonNull Long id, Pharmacy updatedPharmacy) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        if (updatedPharmacy.getPharmacyName() != null)
            pharmacy.setPharmacyName(updatedPharmacy.getPharmacyName());
        if (updatedPharmacy.getEmail() != null)
            pharmacy.setEmail(updatedPharmacy.getEmail());
        if (updatedPharmacy.getPhone() != null)
            pharmacy.setPhone(updatedPharmacy.getPhone());
        if (updatedPharmacy.getAddress() != null)
            pharmacy.setAddress(updatedPharmacy.getAddress());
        if (updatedPharmacy.getOperatingHours() != null)
            pharmacy.setOperatingHours(updatedPharmacy.getOperatingHours());
        if (updatedPharmacy.getDistrict() != null)
            pharmacy.setDistrict(updatedPharmacy.getDistrict());
        return pharmacyRepository.save(pharmacy);
    }

    public Pharmacy suspendPharmacy(@NonNull Long id) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        pharmacy.setStatus(PharmacyStatus.SUSPENDED);
        return pharmacyRepository.save(pharmacy);
    }

    public Pharmacy removePharmacy(@NonNull Long id) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        pharmacy.setStatus(PharmacyStatus.REMOVED);
        return pharmacyRepository.save(pharmacy);
    }

    public Pharmacy activatePharmacy(@NonNull Long id) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        pharmacy.setStatus(PharmacyStatus.ACTIVE);
        return pharmacyRepository.save(pharmacy);
    }

    public Map<String, Long> getPharmacyMetrics() {
        Map<String, Long> metrics = new HashMap<>();
        metrics.put("total", pharmacyRepository.count());
        metrics.put("active", pharmacyRepository.countByStatus(PharmacyStatus.ACTIVE));
        metrics.put("suspended", pharmacyRepository.countByStatus(PharmacyStatus.SUSPENDED));
        metrics.put("removed", pharmacyRepository.countByStatus(PharmacyStatus.REMOVED));
        return metrics;
    }

    // --- Pharmacy Client Portal Methods (Restored) ---

    public Pharmacy registerPharmacy(Pharmacy pharmacy) {
        pharmacy.setStatus(PharmacyStatus.PENDING);
        return pharmacyRepository.save(pharmacy);
    }

    @Transactional
    public PharmacyInventory updateInventory(@NonNull Long pharmacyId, @NonNull Long medicineId, Integer quantity,
            BigDecimal price) {
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        Optional<PharmacyInventory> inventoryOpt = pharmacyInventoryRepository.findByPharmacyAndMedicine(pharmacy,
                medicine);

        PharmacyInventory inventory;
        if (inventoryOpt.isPresent()) {
            inventory = inventoryOpt.get();
        } else {
            inventory = new PharmacyInventory();
            inventory.setPharmacy(pharmacy);
            inventory.setMedicine(medicine);
        }

        inventory.setAvailableQuantity(quantity);
        inventory.setPrice(price);
        inventory.setLastUpdated(LocalDateTime.now());

        return pharmacyInventoryRepository.save(inventory);
    }

    public List<Reservation> getPharmacyReservations(@NonNull Long pharmacyId) {
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        return reservationRepository.findByPharmacy(pharmacy);
    }

    public Reservation updateReservationStatus(@NonNull Long reservationId, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        reservation.setStatus(status);
        reservation.setStatusChangedAt(LocalDateTime.now());
        return reservationRepository.save(reservation);
    }

    public PharmacyReport createReport(PharmacyReport report, @NonNull Long pharmacyId) {
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        report.setPharmacy(pharmacy);
        report.setCreatedAt(LocalDateTime.now());
        if (report.getStatus() == null) {
            report.setStatus(ReportStatus.PENDING);
        }
        return pharmacyReportRepository.save(report);
    }
}
