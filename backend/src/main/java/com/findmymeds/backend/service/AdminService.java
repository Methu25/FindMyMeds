package com.findmymeds.backend.service;

import com.findmymeds.backend.model.*;
import com.findmymeds.backend.model.enums.Role;
import com.findmymeds.backend.repository.AdminActionLogRepository;
import com.findmymeds.backend.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final AdminActionLogRepository actionLogRepository;
    private final PasswordEncoder passwordEncoder;

    public List<AdminResponse> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AdminResponse getAdminById(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new AdminNotFoundException("Admin not found with id: " + id));
        return mapToResponse(admin);
    }

    // Add this new method that returns Optional<Admin> for the ProfileController
    public Optional<Admin> getAdminEntityById(Long id) {
        return adminRepository.findById(id);
    }

    // Add this new method that returns List<Admin> for the ProfileController
    public List<Admin> getAllAdminEntities() {
        return adminRepository.findAll();
    }

    public AdminMetricsResponse getMetrics() {
        long total = adminRepository.count();
        long superAdmins = adminRepository.countByRole(Role.SUPER_ADMIN);
        long regularAdmins = adminRepository.countByRole(Role.ADMIN);

        return new AdminMetricsResponse(total, superAdmins, regularAdmins);
    }

    @Transactional
    public AdminResponse createAdmin(CreateAdminRequest request, Long currentAdminId) {
        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists: " + request.getEmail());
        }

        Admin admin = new Admin();
        admin.setFullName(request.getFullName());
        admin.setEmail(request.getEmail());
        admin.setRole(request.getRole());
        admin.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        Admin savedAdmin = adminRepository.save(admin);

        logAction(currentAdminId, "CREATE_ADMIN", "admins", savedAdmin.getId(),
                "Created new admin: " + savedAdmin.getFullName());

        return mapToResponse(savedAdmin);
    }

    @Transactional
    public AdminResponse updateAdminEmail(Long adminId, UpdateAdminEmailRequest request,
                                          Long currentAdminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AdminNotFoundException("Admin not found with id: " + adminId));

        if (!admin.getEmail().equals(request.getEmail()) &&
                adminRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists: " + request.getEmail());
        }

        String oldEmail = admin.getEmail();
        admin.setEmail(request.getEmail());
        Admin updatedAdmin = adminRepository.save(admin);

        logAction(currentAdminId, "UPDATE_ADMIN_EMAIL", "admins", adminId,
                "Updated email from " + oldEmail + " to " + request.getEmail());

        return mapToResponse(updatedAdmin);
    }

    @Transactional
    public void deleteAdmin(Long adminId, Long currentAdminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AdminNotFoundException("Admin not found with id: " + adminId));

        if (adminId.equals(currentAdminId)) {
            throw new IllegalArgumentException("Cannot delete your own account");
        }

        String adminName = admin.getFullName();
        adminRepository.delete(admin);

        logAction(currentAdminId, "DELETE_ADMIN", "admins", adminId,
                "Deleted admin: " + adminName);
    }

    private void logAction(Long adminId, String actionType, String targetTable,
                           Long targetId, String description) {
        AdminActionLog log = new AdminActionLog();

        Admin admin = adminRepository.getReferenceById(adminId);
        log.setAdmin(admin);

        log.setActionType(actionType);
        log.setTargetTable(targetTable);
        log.setTargetId(targetId);
        log.setDescription(description);
        actionLogRepository.save(log);
    }

    private AdminResponse mapToResponse(Admin admin) {
        return new AdminResponse(
                admin.getId(),
                admin.getFullName(),
                admin.getEmail(),
                admin.getRole(),
                admin.getCreatedAt()
        );
    }
}