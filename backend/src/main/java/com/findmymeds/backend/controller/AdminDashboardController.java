package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.*;
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

    @GetMapping("/charts/civilians")
    public List<AdminChartCountDTO> getCivilianChart() {
        return adminDashboardService.getCivilianDistributionChart();
    }

    @GetMapping("/charts/pharmacies")
    public List<AdminChartCountDTO> getPharmacyChart() {
        return adminDashboardService.getPharmacyHealthChart();
    }

    @GetMapping("/charts/admins")
    public List<AdminChartCountDTO> getAdminChart() {
        return adminDashboardService.getAdminStatusChart();
    }

    @GetMapping("/charts/reservations")
    public List<AdminChartTimePointDTO> getReservationChart(
            @RequestParam(defaultValue = "30") int days) {
        return adminDashboardService.getReservationVolumeChart(days);
    }

    @GetMapping("/overview/super")
    public AdminOverviewSuperDTO getSuperOverview() {
        return adminDashboardService.getSuperAdminOverview();
    }

    @GetMapping("/overview/admin")
    public AdminOverviewAdminDTO getAdminOverview() {
        return adminDashboardService.getAdminOverview();
    }

    @GetMapping("/notifications/metrics")
    public AdminNotificationMetricsDTO getNotificationMetrics() {
        return adminDashboardService.getNotificationMetrics();
    }
}
