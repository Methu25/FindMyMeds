package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.PharmacyLoginRequest;
import com.findmymeds.backend.dto.PharmacyLoginResponse;
import com.findmymeds.backend.dto.PharmacySignupRequest;
import com.findmymeds.backend.service.PharmacyAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/auth")
@RequiredArgsConstructor
public class PharmacyAuthController {

    private final PharmacyAuthService pharmacyAuthService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody PharmacySignupRequest request) {
        pharmacyAuthService.signup(request);
        return ResponseEntity.ok("Pharmacy registered successfully. Please wait for admin approval.");
    }

    @PostMapping("/login")
    public ResponseEntity<PharmacyLoginResponse> login(@RequestBody PharmacyLoginRequest request) {
        return ResponseEntity.ok(pharmacyAuthService.login(request));
    }
}
