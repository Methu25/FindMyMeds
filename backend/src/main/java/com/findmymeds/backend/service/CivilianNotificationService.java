package com.findmymeds.backend.service;

import com.findmymeds.backend.model.CivilianNotification;
import com.findmymeds.backend.model.enums.CivilianNotificationType;
import com.findmymeds.backend.repository.CivilianNotificationRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CivilianNotificationService {

    private final CivilianNotificationRepo repository;

    public CivilianNotificationService(CivilianNotificationRepo repository) {
        this.repository = repository;
    }

    // GET all notifications
    public List<CivilianNotification> getAll(Integer userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // GET by type
    public List<CivilianNotification> getByType(
            Integer userId,
            CivilianNotificationType type
    ) {
        return repository.findByUserIdAndType(userId, type);
    }

    // GET by read status
    public List<CivilianNotification> getByReadStatus(
            Integer userId,
            Boolean isRead
    ) {
        return repository.findByUserIdAndIsRead(userId, isRead);
    }

    // GET single notification
    public CivilianNotification getOne(Integer id, Integer userId) {
        return repository.findById(id)
                .filter(n -> n.getUserId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    // MARK AS READ
    public void markAsRead(Integer id, Integer userId) {
        CivilianNotification notification = getOne(id, userId);
        notification.setIsRead(true);
        repository.save(notification);
    }


}
