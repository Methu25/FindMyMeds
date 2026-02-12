package com.findmymeds.backend.service;

import com.findmymeds.backend.config.PharmacyUserDetails;
import com.findmymeds.backend.config.JwtService;
import com.findmymeds.backend.dto.PharmacyLoginRequest;
import com.findmymeds.backend.dto.AuthenticationResponse;
import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.repository.PharmacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PharmacyAuthService {

    private final PharmacyRepository pharmacyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthenticationResponse login(PharmacyLoginRequest request) {
        Pharmacy pharmacy = pharmacyRepository.findByLicenseNumber(request.getLicenseNumber())
                .orElseThrow(() -> new UsernameNotFoundException("Pharmacy not found"));

        if (!passwordEncoder.matches(request.getPassword(), pharmacy.getPasswordHash())) {
            throw new BadCredentialsException("Invalid password");
        }

        PharmacyUserDetails userDetails = new PharmacyUserDetails(pharmacy);
        String token = jwtService.generateToken(userDetails);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
}
