package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Notification;
import com.findmymeds.backend.model.enums.NotificationType;
import com.findmymeds.backend.model.enums.RelatedEntityType;
import com.findmymeds.backend.model.enums.Role;
import com.findmymeds.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository repository;

    public void createNotification(Role role, NotificationType type, String title, String message,
            RelatedEntityType relatedEntityType, Long relatedEntityId) {
        Notification n = new Notification();
        n.setTargetRole(role);
        n.setNotificationType(type);
        n.setTitle(title);
        n.setMessage(message);
        n.setRelatedEntityType(relatedEntityType);
        n.setRelatedEntityId(relatedEntityId);
        repository.save(n);
    }

    public List<Notification> getNotifications(Role role) {
        return repository.findByTargetRoleOrderByCreatedAtDesc(role);
    }

    public void markAsRead(Long id) {
        Notification n = repository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
        // Assuming getter/setter for read field are setRead/isRead or getRead
        // Since @Data is used, and field is Boolean (wrapper), it should be getRead()
        // and setRead().
        // If primitive boolean, it would be isRead().
        // Let's assume setRead is correct.
        n.setRead(true);
        n.setReadAt(LocalDateTime.now());
        repository.save(n);
    }

    public Notification getNotification(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
    }
}
