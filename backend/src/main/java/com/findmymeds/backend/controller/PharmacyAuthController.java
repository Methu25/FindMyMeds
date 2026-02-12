package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.AuthenticationResponse;
import com.findmymeds.backend.dto.PharmacyLoginRequest;
import com.findmymeds.backend.service.PharmacyAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pharmacy/auth")
@RequiredArgsConstructor
public class PharmacyAuthController {

    private final PharmacyAuthService service;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody PharmacyLoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }
}
