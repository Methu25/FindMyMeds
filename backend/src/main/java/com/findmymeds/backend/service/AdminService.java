package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Admin;
import com.findmymeds.backend.model.enums.AdminStatus;
import com.findmymeds.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        return adminRepository.findById(id);
    }

    public Admin createAdmin(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        admin.setPasswordHash(passwordEncoder.encode(admin.getPasswordHash()));
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Long id, Admin adminDetails) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        admin.setFullName(adminDetails.getFullName());
        admin.setEmail(adminDetails.getEmail());
        admin.setRole(adminDetails.getRole());

        return adminRepository.save(admin);
    }

    public Admin updateStatus(Long id, AdminStatus status) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setStatus(status);
        return adminRepository.save(admin);
    }

    public void removeAdmin(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        // Soft delete or Hard delete? Spec says 'Removed' status or 'Permanently
        // delete'.
        // Spec: "Permanently delete admin account".
        adminRepository.deleteById(id);
    }
}
