package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.NotificationCategoryCountDTO;
import com.findmymeds.backend.dto.NotificationDTO;
import com.findmymeds.backend.model.Notification;
import com.findmymeds.backend.model.enums.NotificationType;
import com.findmymeds.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PharmacyNotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    private Long getCurrentPharmacyId() {
        return 1L; // Hardcoded for development
    }

    public List<NotificationCategoryCountDTO> getCategoryCounts() {
        Long pharmacyId = getCurrentPharmacyId();
        List<NotificationCategoryCountDTO> counts = new ArrayList<>();

        // 1. Reservations
        counts.add(new NotificationCategoryCountDTO("Reservations",
                notificationRepository.countUnreadByTypes(pharmacyId, List.of(NotificationType.RESERVATION))));

        // 2. Inventory (Medicine related)
        counts.add(new NotificationCategoryCountDTO("Inventory",
                notificationRepository.countUnreadByTypes(pharmacyId, List.of(NotificationType.MEDICINE))));

        // 3. Expiry & Stock (Pharmacy related - e.g. stock warnings)
        counts.add(new NotificationCategoryCountDTO("Expiry & Stock",
                notificationRepository.countUnreadByTypes(pharmacyId, List.of(NotificationType.PHARMACY))));

        // 4. Admin & System
        counts.add(new NotificationCategoryCountDTO("Admin & System",
                notificationRepository.countUnreadByTypes(pharmacyId,
                        Arrays.asList(NotificationType.ADMIN, NotificationType.SYSTEM, NotificationType.ACCOUNT,
                                NotificationType.REPORT, NotificationType.APPEAL))));

        return counts;
    }

    public Page<NotificationDTO> getNotifications(int page, int size) {
        Long pharmacyId = getCurrentPharmacyId();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Notification> notifications = notificationRepository.findByPharmacyId(pharmacyId, pageable);
        return notifications.map(this::mapToDTO);
    }

    public void markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + id));

        // Optional: Check if notification belongs to current user
        // if (!notification.getUserId().equals(getCurrentPharmacyId())) throw ...

        notification.setRead(true);
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    private NotificationDTO mapToDTO(Notification n) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(n.getId());
        dto.setType(n.getNotificationType());
        dto.setTitle(n.getTitle());
        dto.setMessage(n.getMessage());
        dto.setRead(n.getRead());
        dto.setCreatedAt(n.getCreatedAt());
        dto.setRelatedEntityId(n.getRelatedEntityId());
        return dto;
    }
}
