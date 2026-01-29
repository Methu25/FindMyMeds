package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.AdminDashboardStatsDTO;
import com.findmymeds.backend.dto.AdminSystemOverviewDTO;
import com.findmymeds.backend.dto.AdminPendingAlertsDTO;
import com.findmymeds.backend.dto.AdminNotificationResponseDTO;
import com.findmymeds.backend.service.AdminDashboardService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    // 🔹 Admin Home – Top metric cards
    @GetMapping("/overview")
    public AdminSystemOverviewDTO getSystemOverview() {
        return adminDashboardService.getSystemOverview();
    }

    // 🔹 Civilian Management dashboard stats
    @GetMapping("/stats")
    public AdminDashboardStatsDTO getDashboardStats() {
        return adminDashboardService.getDashboardStats();
    }

    // 🔹 Admin Home – Alerts card
    @GetMapping("/alerts")
    public AdminPendingAlertsDTO getPendingAlerts() {
        return adminDashboardService.getPendingAlerts();
    }

    // 🔹 Admin Home – Recent notifications (latest 2)
    @GetMapping("/notifications/recent")
    public List<AdminNotificationResponseDTO> getRecentUnreadNotifications() {
        return adminDashboardService.getRecentUnreadAdminNotifications();
    }
}
