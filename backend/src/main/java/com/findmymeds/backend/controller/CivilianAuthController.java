package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.LoginRequest;
import com.findmymeds.backend.dto.LoginResponse;
import com.findmymeds.backend.service.CivilianAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/civilian/auth")
@RequiredArgsConstructor
public class CivilianAuthController {
    private final CivilianAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
