package com.findmymeds.backend.service;

import com.findmymeds.backend.model.*;
import com.findmymeds.backend.model.enums.ReservationStatus;
import com.findmymeds.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CivilianReservationService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private PharmacyInventoryRepository pharmacyInventoryRepository;

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired
    private CivilianRepository civilianRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    // Step 1: Search Medicines
    public List<Medicine> searchMedicines(String name) {
        return medicineRepository.findByMedicineNameContainingIgnoreCaseAndStatusAndRemovedFalse(name,
                Medicine.MedicineStatus.ACTIVE);
    }

    // Step 3: Recommend Pharmacies
    public List<Map<String, Object>> recommendPharmacies(Long medicineId, Integer quantity) {
        List<PharmacyInventory> inventoryList = pharmacyInventoryRepository.findPharmaciesWithStock(medicineId,
                quantity);

        return inventoryList.stream().map(inv -> {
            Pharmacy p = inv.getPharmacy();
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("pharmacyId", p.getId());
            map.put("pharmacyName", p.getName());
            map.put("availableQuantity", inv.getAvailableQuantity());
            map.put("location", p.getDistrict() != null ? p.getDistrict() : "Unknown");
            map.put("latitude", p.getLatitude() != null ? p.getLatitude() : 0.0);
            map.put("longitude", p.getLongitude() != null ? p.getLongitude() : 0.0);
            return map;
        }).collect(Collectors.toList());
    }

    // Step 5: Confirm Reservation
    @Transactional
    public Reservation confirmReservation(@org.springframework.lang.NonNull Long civilianId,
            @org.springframework.lang.NonNull Long medicineId,
            @org.springframework.lang.NonNull Long pharmacyId,
            Integer quantity,
            LocalDate pickupDate, String notes, String prescriptionFile) {
        // 1. Validate Civilian
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));

        // 2. Validate Pharmacy and Medicine
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        // 3. Re-check Inventory
        PharmacyInventory inventory = pharmacyInventoryRepository.findByPharmacyIdAndMedicineId(pharmacyId, medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not available at this pharmacy"));

        if (inventory.getAvailableQuantity() < quantity) {
            throw new RuntimeException("Insufficient quantity available");
        }

        // 4. Create Reservation
        Reservation reservation = new Reservation();
        reservation.setCivilian(civilian);
        reservation.setPharmacy(pharmacy);
        reservation.setMedicine(medicine);
        reservation.setQuantity(quantity);
        reservation.setPickupDate(pickupDate);
        reservation.setNote(notes);
        reservation.setPrescriptionImageUrl(prescriptionFile); // Assuming URL/Path for now
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setExpiryDate(pickupDate.plusDays(2)); // Default 2 days expiry
        reservation.setReservationCode("RES-" + System.currentTimeMillis());

        reservationRepository.save(reservation);

        // 5. Soft Lock Inventory (Deduct)
        inventory.setAvailableQuantity(inventory.getAvailableQuantity() - quantity);
        pharmacyInventoryRepository.save(inventory);

        return reservation;
    }

    // Existing methods (keep them working)
    public Reservation createReservation(@org.springframework.lang.NonNull Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByCivilian(Long civilianId) {
        return reservationRepository.findByCivilianIdOrderByReservationDateDesc(civilianId);
    }
}
