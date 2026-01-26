package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.CivilianNotification;
import com.findmymeds.backend.model.CivilianNotification;
import com.findmymeds.backend.model.enums.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CivilianNotificationRepository
        extends JpaRepository<CivilianNotification, Long> {

    List<CivilianNotification> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<CivilianNotification> findByUserIdAndNotificationType(
            Long userId,
            NotificationType notificationType
    );

    List<CivilianNotification> findByUserIdAndIsRead(
            Long userId,
            Boolean isRead
    );
}
