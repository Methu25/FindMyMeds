package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Notification;
import com.findmymeds.backend.model.enums.NotificationType;
import com.findmymeds.backend.model.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByTargetRoleOrderByCreatedAtDesc(Role role);

    List<Notification> findByTargetRoleAndNotificationType(Role role, NotificationType type);

    @Modifying
    @Query("DELETE FROM Notification n WHERE n.read = true AND n.readAt < :cutoff")
    void deleteOldReadNotifications(@Param("cutoff") LocalDateTime cutoff);
}
