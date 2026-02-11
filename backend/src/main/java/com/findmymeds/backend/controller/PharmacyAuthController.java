package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.LoginRequest;
import com.findmymeds.backend.dto.LoginResponse;
import com.findmymeds.backend.service.PharmacyAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pharmacy/auth")
@RequiredArgsConstructor
public class PharmacyAuthController {
    private final PharmacyAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
