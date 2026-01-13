package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Notification;
import com.findmymeds.backend.model.enums.NotificationType;
import com.findmymeds.backend.model.enums.Role;
import com.findmymeds.backend.model.enums.UserType;
import com.findmymeds.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(Long userId, UserType userType, NotificationType type, String title,
            String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setUserType(userType);
        notification.setNotificationType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    public void createNotification(Role role, NotificationType type, String title, String message, Long entityId) {
        Notification notification = new Notification();
        notification.setTargetRole(role);
        notification.setNotificationType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRelatedEntityId(entityId);
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    public List<Notification> getNotifications(Role role) {
        return notificationRepository.findByTargetRoleOrderByCreatedAtDesc(role);
    }

    public void markAsRead(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Notification ID cannot be null");
        }
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        notification.setReadAt(java.time.LocalDateTime.now());
        notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(Long userId, UserType userType) {
        return notificationRepository.findAll().stream()
                .filter(n -> n.getUserId() != null && n.getUserId().equals(userId) && n.getUserType() == userType)
                .toList();
    }
}
