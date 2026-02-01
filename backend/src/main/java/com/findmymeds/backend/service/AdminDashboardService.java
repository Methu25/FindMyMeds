package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.AdminDashboardStatsDTO;
import com.findmymeds.backend.dto.AdminSystemOverviewDTO;
import com.findmymeds.backend.dto.AdminPendingAlertsDTO;
import com.findmymeds.backend.dto.AdminNotificationResponseDTO;

import com.findmymeds.backend.model.Notification;
import com.findmymeds.backend.model.enums.*;

import com.findmymeds.backend.repository.*;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminDashboardService {

    private final CivilianRepository civilianRepository;
    private final AdminRepository adminRepository;
    private final PharmacyRepository pharmacyRepository;
    private final NotificationRepository notificationRepository;
    private final CivilianAppealRepository civilianAppealRepository;

    public AdminDashboardService(
            CivilianRepository civilianRepository,
            AdminRepository adminRepository,
            PharmacyRepository pharmacyRepository,
            NotificationRepository notificationRepository,
            CivilianAppealRepository civilianAppealRepository
    ) {
        this.civilianRepository = civilianRepository;
        this.adminRepository = adminRepository;
        this.pharmacyRepository = pharmacyRepository;
        this.notificationRepository = notificationRepository;
        this.civilianAppealRepository = civilianAppealRepository;
    }

    // ===============================
    // 1️⃣ Civilian Management dashboard stats
    // ===============================
    public AdminDashboardStatsDTO getDashboardStats() {

        long total = civilianRepository.count();

        long active =
                civilianRepository.countByAccountStatus(AccountStatus.ACTIVE);

        long tempBanned =
                civilianRepository.countByAccountStatus(AccountStatus.TEMP_BANNED);

        long permanentBanned =
                civilianRepository.countByAccountStatus(AccountStatus.PERMANENT_BANNED);

        return new AdminDashboardStatsDTO(
                total,
                active,
                tempBanned,
                permanentBanned
        );
    }

    // ===============================
    // 2️⃣ Admin Home – System Overview (top metric cards)
    // ===============================
    public AdminSystemOverviewDTO getSystemOverview() {

        long totalCivilians = civilianRepository.count();

        long totalAdmins = adminRepository.count();
        long activeAdmins =
                adminRepository.countByStatus(AdminStatus.ACTIVE);

        long totalPharmacies = pharmacyRepository.count();
        long pendingPharmacies =
                pharmacyRepository.countByStatus(PharmacyStatus.PENDING);

        return new AdminSystemOverviewDTO(
                totalCivilians,
                totalAdmins,
                activeAdmins,
                totalPharmacies,
                pendingPharmacies
        );
    }

    // ===============================
    // 3️⃣ Admin Dashboard – Alerts card
    // ===============================
    public AdminPendingAlertsDTO getPendingAlerts() {

        long pendingAppeals =
                civilianAppealRepository.countByStatus(AppealStatus.PENDING);

        long pendingPharmacies =
                pharmacyRepository.countByStatus(PharmacyStatus.PENDING);

        long unreadNotifications =
                notificationRepository.countByTargetRoleAndReadFalse(Role.ADMIN);

        long totalAlerts =
                pendingAppeals + pendingPharmacies + unreadNotifications;

        return new AdminPendingAlertsDTO(
                totalAlerts,
                pendingAppeals,
                pendingPharmacies,
                unreadNotifications
        );
    }

    // ===============================
    // 4️⃣ Admin Dashboard – Recent unread notifications (top 2)
    // ===============================
    public List<AdminNotificationResponseDTO> getRecentUnreadAdminNotifications() {

        List<Notification> notifications =
                notificationRepository
                        .findTop2ByTargetRoleAndReadFalseOrderByCreatedAtDesc(Role.ADMIN);

        return notifications.stream()
                .map(n -> new AdminNotificationResponseDTO(
                        n.getId(),
                        n.getTitle(),
                        n.getMessage(),
                        n.getNotificationType(),
                        n.getPriority(),
                        Boolean.TRUE.equals(n.getRead()),
                        n.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}
