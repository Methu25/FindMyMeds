package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Admin;
// Services
import com.findmymeds.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Assuming AuthenticationPrincipal correctly resolves to Admin object based on
    // your SecurityConfig
    // If not, we might need to change this to UserDetails and fetch Admin by
    // username
    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Integer>> getMetrics(@AuthenticationPrincipal Admin admin) {
        return ResponseEntity.ok(dashboardService.getMetrics(admin));
    }

    @GetMapping("/charts")
    public ResponseEntity<Map<String, Object>> getCharts(@AuthenticationPrincipal Admin admin) {
        return ResponseEntity.ok(dashboardService.getChartData(admin));
    }

    @GetMapping("/notifications")
    public ResponseEntity<Map<String, Object>> getNotifications(@AuthenticationPrincipal Admin admin) {
        return ResponseEntity.ok(dashboardService.getNotificationData(admin));
    }
}
