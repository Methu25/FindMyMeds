package com.findmymeds.backend.service;

import com.findmymeds.backend.model.*;
import com.findmymeds.backend.model.enums.*;
import com.findmymeds.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CivilianRepository civilianRepository;

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired
    private PharmacyProfileRepository pharmacyProfileRepository;

    @Autowired
    private CivilianAppealRepository civilianAppealRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminActivityLogRepository adminActivityLogRepository;

    // Admin Metrics
    public java.util.Map<String, Long> getAdminMetrics() {
        java.util.Map<String, Long> metrics = new java.util.HashMap<>();
        metrics.put("total", adminRepository.count());
        metrics.put("active", adminRepository.countByStatus(AdminStatus.ACTIVE));
        metrics.put("deactivated", adminRepository.countByStatus(AdminStatus.DEACTIVATED));
        metrics.put("removed", adminRepository.countByStatus(AdminStatus.REMOVED));
        return metrics;
    }

    public Admin createAdmin(Admin admin, Long creatorId) {
        if (adminRepository.findByEmail(admin.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        admin.setPasswordHash(passwordEncoder.encode(admin.getPasswordHash()));
        Admin savedAdmin = adminRepository.save(admin);
        logActivity(creatorId, "Add Admin", savedAdmin.getId());
        return savedAdmin;
    }

    public java.util.List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Long adminId) {
        if (adminId == null) {
            throw new IllegalArgumentException("Admin ID cannot be null");
        }
        return adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    public Admin updateAdmin(Long adminId, Admin updatedAdmin, Long updaterId) {
        Admin admin = getAdminById(adminId);
        admin.setFullName(updatedAdmin.getFullName());
        admin.setEmail(updatedAdmin.getEmail());
        admin.setRole(updatedAdmin.getRole());
        // Status is handled separately or via this method if generic update
        Admin saved = adminRepository.save(admin);
        logActivity(updaterId, "Update Admin", adminId);
        return saved;
    }

    public Admin updateAdminEmail(Long adminId, String newEmail, Long updaterId) {
        Admin admin = getAdminById(adminId);
        admin.setEmail(newEmail);
        Admin saved = adminRepository.save(admin);
        logActivity(updaterId, "Update Admin Email", adminId);
        return saved;
    }

    public void changeAdminStatus(Long adminId, AdminStatus status, Long updaterId) {
        Admin admin = getAdminById(adminId);
        admin.setStatus(status);
        adminRepository.save(admin);
        String action = switch (status) {
            case ACTIVE -> "Activate Admin";
            case DEACTIVATED -> "Deactivate Admin";
            case REMOVED -> "Remove Admin";
        };
        logActivity(updaterId, action, adminId);
    }

    public java.util.List<AdminActivityLog> getAdminActivityLogs(Long adminId) {
        return adminActivityLogRepository.findByAdminIdOrderByTimestampDesc(adminId);
    }

    private void logActivity(Long adminId, String action, Long targetAdminId) {
        AdminActivityLog log = new AdminActivityLog();
        log.setAdminId(adminId);
        log.setAction(action);
        log.setTargetAdminId(targetAdminId);
        adminActivityLogRepository.save(log);
    }

    // Civilian Management
    public void banCivilian(Long civilianId, BanType type) {
        if (civilianId == null) {
            throw new IllegalArgumentException("Civilian ID cannot be null");
        }
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));
        if (type == BanType.PERMANENT) {
            civilian.setAccountStatus(AccountStatus.PERMANENT_BANNED);
        } else {
            civilian.setAccountStatus(AccountStatus.TEMP_BANNED);
            civilian.setTempBanCount(civilian.getTempBanCount() + 1);
        }
        civilianRepository.save(civilian);
    }

    public void unbanCivilian(Long civilianId) {
        if (civilianId == null) {
            throw new IllegalArgumentException("Civilian ID cannot be null");
        }
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));
        civilian.setAccountStatus(AccountStatus.ACTIVE);
        civilianRepository.save(civilian);
    }

    // Pharmacy Management
    public void verifyPharmacy(Long pharmacyId, Boolean verified) {
        PharmacyProfile profile = pharmacyProfileRepository.findAll().stream()
                .filter(p -> p.getPharmacy().getId().equals(pharmacyId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Pharmacy Profile not found"));
        profile.setVerified(verified);
        pharmacyProfileRepository.save(profile);
    }

    public Pharmacy suspendPharmacy(Long pharmacyId) {
        if (pharmacyId == null) {
            throw new IllegalArgumentException("Pharmacy ID cannot be null");
        }
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        pharmacy.setStatus(PharmacyStatus.SUSPENDED);
        return pharmacyRepository.save(pharmacy);
    }

    // Appeals
    public CivilianAppeal resolveAppeal(Long appealId, AppealStatus status) {
        if (appealId == null) {
            throw new IllegalArgumentException("Appeal ID cannot be null");
        }
        CivilianAppeal appeal = civilianAppealRepository.findById(appealId)
                .orElseThrow(() -> new RuntimeException("Appeal not found"));
        appeal.setStatus(status);
        appeal.setResolvedAt(LocalDateTime.now());
        return civilianAppealRepository.save(appeal);
    }

    // Medicine Registry
    public Medicine addMedicine(Medicine medicine) {
        if (medicine == null) {
            throw new IllegalArgumentException("Medicine cannot be null");
        }
        return medicineRepository.save(medicine);
    }
}
