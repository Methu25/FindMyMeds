package com.findmymeds.backend.service;

import com.findmymeds.backend.model.CivilianNotification;
import com.findmymeds.backend.repository.CivilianNotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CivilianNotificationService {

    @Autowired
    private CivilianNotificationRepository repository;

    public List<CivilianNotification> getAllNotifications(Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public CivilianNotification getNotificationById(
            Long id,
            int userId
    ) {
        return repository.findById(id)
                .filter(n -> n.getUserId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    public void markAsRead(Integer id, Integer userId) {
        CivilianNotification notification = getNotificationById(id, userId);

        if (!Boolean.TRUE.equals(notification.getIsRead())) {
            notification.setIsRead(true);
            notification.setUpdatedAt(LocalDateTime.now());
        }

        repository.save(notification);
    }
}
