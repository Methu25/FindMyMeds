package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.LoginRequest;
import com.findmymeds.backend.dto.LoginResponse;
import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.repository.PharmacyRepository;
import com.findmymeds.backend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PharmacyAuthService {
    private final PharmacyRepository pharmacyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        Pharmacy pharmacy = pharmacyRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        if (pharmacy.getStatus() == PharmacyStatus.SUSPENDED || pharmacy.getStatus() == PharmacyStatus.REJECTED
                || pharmacy.getStatus() == PharmacyStatus.REMOVED) {
            throw new RuntimeException("Account is not active");
        }

        if (pharmacy.getIsDeleted() != null && pharmacy.getIsDeleted()) {
            throw new RuntimeException("Account is deleted");
        }

        if (pharmacy.getStatus() != PharmacyStatus.ACTIVE) {
            throw new RuntimeException("Account is not active yet.");
        }

        if (pharmacy.getPasswordHash() == null) {
            throw new RuntimeException("Account not set up for password login.");
        }

        if (!passwordEncoder.matches(request.getPassword(), pharmacy.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "PHARMACY");
        claims.put("pharmacyId", pharmacy.getId());

        String token = jwtService.generateToken(pharmacy.getEmail(), claims);
        return new LoginResponse(token, pharmacy.getName(), "PHARMACY");
    }
}
