package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.AdminAppealRejectRequestDTO;
import com.findmymeds.backend.service.CivilianAppealAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/appeals")
@RequiredArgsConstructor
public class AdminCivilianAppealController {

    private final CivilianAppealAdminService appealAdminService;

    @PostMapping("/{appealId}/approve")
    public void approve(@PathVariable Long appealId, @RequestParam Long adminId) {
        appealAdminService.approve(appealId, adminId);
    }

    @PostMapping("/{appealId}/reject")
    public void reject(@PathVariable Long appealId,
                       @RequestParam Long adminId,
                       @RequestBody AdminAppealRejectRequestDTO request) {
        appealAdminService.reject(appealId, adminId, request.getReason());
    }
}
