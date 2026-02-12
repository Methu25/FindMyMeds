package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.PharmacyLoginRequest;
import com.findmymeds.backend.dto.PharmacyLoginResponse;
import com.findmymeds.backend.dto.PharmacySignupRequest;
import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import com.findmymeds.backend.model.enums.PharmacyType;
import com.findmymeds.backend.repository.PharmacyRepository;
import com.findmymeds.backend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PharmacyAuthService {

    private final PharmacyRepository pharmacyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void signup(PharmacySignupRequest request) {
        if (pharmacyRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Pharmacy pharmacy = new Pharmacy();
        pharmacy.setName(request.getName());
        pharmacy.setEmail(request.getEmail());
        pharmacy.setPassword(passwordEncoder.encode(request.getPassword()));
        pharmacy.setLicenseNumber(request.getLicenseNumber());
        pharmacy.setAddress(request.getAddress());
        pharmacy.setPhone(request.getPhone());
        pharmacy.setDistrict(request.getDistrict());
        pharmacy.setOwnerName(request.getOwnerName());

        // Defaults
        pharmacy.setStatus(PharmacyStatus.PENDING);
        pharmacy.setPharmacyType(PharmacyType.RETAIL);
        pharmacy.setCreatedAt(LocalDateTime.now());
        pharmacy.setIsDeleted(false);
        pharmacy.setReviews(0);
        pharmacy.setRating(0.0);

        pharmacyRepository.save(pharmacy);
    }

    public PharmacyLoginResponse login(PharmacyLoginRequest request) {
        Pharmacy pharmacy = pharmacyRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        if (!passwordEncoder.matches(request.getPassword(), pharmacy.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Allow PENDING for now so they can see a "Pending Approval" screen if we build
        // it,
        // or strictly block. User didn't specify.
        // AdminAuthService blocks inactive.
        // I'll block SUSPENDED or REJECTED or REMOVED.
        if (pharmacy.getStatus() == PharmacyStatus.SUSPENDED ||
                pharmacy.getStatus() == PharmacyStatus.REJECTED ||
                pharmacy.getStatus() == PharmacyStatus.REMOVED) {
            throw new RuntimeException("Account is " + pharmacy.getStatus());
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "PHARMACY");
        claims.put("pharmacyId", pharmacy.getId());

        String token = jwtService.generateToken(pharmacy.getEmail(), claims);
        return new PharmacyLoginResponse(token, pharmacy.getId(), pharmacy.getName(), "PHARMACY");
    }
}
