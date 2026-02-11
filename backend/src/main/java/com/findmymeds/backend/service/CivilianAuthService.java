package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.LoginRequest;
import com.findmymeds.backend.dto.LoginResponse;
import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.model.enums.AccountStatus;
import com.findmymeds.backend.repository.CivilianRepository;
import com.findmymeds.backend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CivilianAuthService {
    private final CivilianRepository civilianRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        Civilian civilian = civilianRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Civilian not found"));

        if (civilian.getAccountStatus() == AccountStatus.PERMANENT_BANNED) {
            throw new RuntimeException("Account is permanently banned");
        }

        if (civilian.getIsLoginDisabled()) {
            throw new RuntimeException("Login is disabled for this account");
        }

        if (!passwordEncoder.matches(request.getPassword(), civilian.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "CIVILIAN");
        claims.put("civilianId", civilian.getId());

        String token = jwtService.generateToken(civilian.getEmail(), claims);
        return new LoginResponse(token, civilian.getFullName(), "CIVILIAN");
    }
}
