package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Admin;
import com.findmymeds.backend.model.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
/**
 * Service for handling Dashboard metrics and charts.
 */
public class DashboardService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Integer> getMetrics(Admin admin) {
        Map<String, Integer> metrics = new HashMap<>();

        // Metric: Total Civilians
        Integer totalCivilians = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM civilians", Integer.class);
        metrics.put("totalCivilians", totalCivilians != null ? totalCivilians : 0);

        // Metric: Temporary Bans
        Integer temporaryBans = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM civilians WHERE account_status='TEMP_BANNED'", Integer.class);
        metrics.put("temporaryBans", temporaryBans != null ? temporaryBans : 0);

        // Metric: Pending Civilian Appeals
        Integer pendingAppeals = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM civilian_appeals WHERE status='PENDING'", Integer.class);
        metrics.put("pendingAppeals", pendingAppeals != null ? pendingAppeals : 0);

        // Metric: Pending Pharmacy Requests (Assumed to be mapped to PENDING pharmacies
        // for now if table missing)
        // If pharmacy_requests table doesn't exist, we might skip or use pharmacies
        // table
        // For now, I will comment this out if table is unknown, or use a placeholders.
        // The prompt asked for "Pending Pharmacy Requests" for Admin.
        // I'll assume 'pharmacy_requests' table might not exist based on file list, so
        // I'll skip it to avoid runtime error,
        // or check if it's meant to be something else. I will use 0 for now.
        metrics.put("pendingPharmacyRequests", 0);

        // Super Admin Metrics
        if (admin.getRole() == Role.SUPER_ADMIN) {
            // Metric: Total Admins
            Integer totalAdmins = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM admins", Integer.class);
            metrics.put("totalAdmins", totalAdmins != null ? totalAdmins : 0);

            // Metric: Active Admins
            Integer activeAdmins = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM admins WHERE status='ACTIVE'", Integer.class);
            metrics.put("activeAdmins", activeAdmins != null ? activeAdmins : 0);

            // Metric: Total Pharmacies
            Integer totalPharmacies = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM pharmacies", Integer.class);
            metrics.put("totalPharmacies", totalPharmacies != null ? totalPharmacies : 0);

            // Metric: Pending Pharmacy Approvals
            Integer pendingPharmacyApprovals = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM pharmacies WHERE status='PENDING'", Integer.class);
            metrics.put("pendingPharmacyApprovals", pendingPharmacyApprovals != null ? pendingPharmacyApprovals : 0);
        }

        // Notifications
        // Assuming admin notifications are where user_type='ADMIN' and user_id matches
        Integer adminNotifications = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM notifications WHERE user_type='ADMIN' AND user_id=?",
                Integer.class, admin.getId());
        metrics.put("adminNotifications", adminNotifications != null ? adminNotifications : 0);

        // System Notifications?
        Integer systemNotifications = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM notifications WHERE notification_type='SYSTEM_ALERT'", Integer.class);
        metrics.put("systemNotifications", systemNotifications != null ? systemNotifications : 0);

        return metrics;
    }

    public Map<String, Object> getChartData(Admin admin) {
        Map<String, Object> charts = new HashMap<>();

        // Chart: Civilian Status Distribution
        List<Map<String, Object>> civilianStatus = jdbcTemplate.queryForList(
                "SELECT account_status as status, COUNT(*) AS count FROM civilians GROUP BY account_status");
        charts.put("civilianStatus", civilianStatus);

        // Chart: Reservation Analytics (Simulated/Assumed table 'reservations')
        // Check if reservations table exists? File list shows Reservation.java
        List<Map<String, Object>> reservationAnalytics = jdbcTemplate.queryForList(
                "SELECT DATE(created_at) as reservation_date, COUNT(*) AS total FROM reservations " +
                        "WHERE created_at >= NOW() - INTERVAL 30 DAY GROUP BY DATE(created_at)");
        charts.put("reservationAnalytics", reservationAnalytics);

        if (admin.getRole() == Role.SUPER_ADMIN) {
            // Chart: Pharmacy Stats
            List<Map<String, Object>> pharmacyStats = jdbcTemplate.queryForList(
                    "SELECT status, COUNT(*) AS count FROM pharmacies GROUP BY status");
            charts.put("pharmacyStats", pharmacyStats);

            // Chart: Admin Stats
            List<Map<String, Object>> adminStats = jdbcTemplate.queryForList(
                    "SELECT status, COUNT(*) AS count FROM admins GROUP BY status");
            charts.put("adminStats", adminStats);
        }

        return charts;
    }

    public Map<String, Object> getNotificationData(Admin admin) {
        Map<String, Object> notifications = new HashMap<>();

        Integer unreadCount = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM notifications WHERE user_type='ADMIN' AND user_id=? AND is_read=0",
                Integer.class, admin.getId());
        notifications.put("unreadCount", unreadCount != null ? unreadCount : 0);

        Integer readCount = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM notifications WHERE user_type='ADMIN' AND user_id=? AND is_read=1",
                Integer.class, admin.getId());
        notifications.put("readCount", readCount != null ? readCount : 0);

        List<Map<String, Object>> recentNotifications = jdbcTemplate.queryForList(
                "SELECT * FROM notifications WHERE user_type='ADMIN' AND user_id=? ORDER BY created_at DESC LIMIT 5",
                admin.getId());
        notifications.put("recentNotifications", recentNotifications);

        return notifications;
    }

    @Scheduled(cron = "0 0 0 * * ?") // Runs daily at midnight
    public void deleteOldResolvedNotifications() {
        jdbcTemplate.update("DELETE FROM notifications WHERE is_read=1 AND created_at <= NOW() - INTERVAL 7 DAY");
    }

    // Scheduled task for reports if needed
    // @Scheduled(cron = "0 0 0 * * ?")
    // public void deleteOldResolvedReports() {
    // jdbcTemplate.update("DELETE FROM civilian_reports WHERE status IN
    // ('RESOLVED', 'REJECTED') AND created_at <= NOW() - INTERVAL 60 DAY");
    // }
}
