package com.findmymeds.backend.service;

import com.findmymeds.backend.config.CivilianUserDetails;
import com.findmymeds.backend.config.JwtService;
import com.findmymeds.backend.dto.LoginRequest; // Assuming generic LoginRequest or create new one
import com.findmymeds.backend.dto.AuthenticationResponse; // Reuse or create new
import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.repository.CivilianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CivilianAuthService {

    private final CivilianRepository civilianRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthenticationResponse register(com.findmymeds.backend.dto.CivilianSignupRequest request) { // Use DTO
        if (civilianRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already taken");
        }
        // Check NIC?
        if (civilianRepository.findByNicNumber(request.getNicNumber()).isPresent()) {
            throw new RuntimeException("NIC already registered");
        }

        var civilian = new Civilian();
        civilian.setFullName(request.getFullName());
        civilian.setEmail(request.getEmail());
        civilian.setPhone(request.getPhone());
        civilian.setNicNumber(request.getNicNumber());
        civilian.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        civilian.setAccountStatus(com.findmymeds.backend.model.enums.AccountStatus.ACTIVE);
        civilian.setCreatedAt(java.time.LocalDateTime.now());

        // Generate masked fields for VIVO/Privacy protocols if needed or leave null
        // civilian.setMaskedEmail(...)

        civilianRepository.save(civilian);

        CivilianUserDetails userDetails = new CivilianUserDetails(civilian);
        String token = jwtService.generateToken(userDetails);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        Civilian civilian = civilianRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Civilian not found"));

        if (!passwordEncoder.matches(request.getPassword(), civilian.getPasswordHash())) {
            throw new BadCredentialsException("Invalid password");
        }

        CivilianUserDetails userDetails = new CivilianUserDetails(civilian);
        String token = jwtService.generateToken(userDetails);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
}
