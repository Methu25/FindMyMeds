package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Notification;
import com.findmymeds.backend.model.enums.NotificationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Assuming user_id for a Pharmacy refers to its ID, and user_type is 'PHARMACY'
    // or similar based on UserType enum (which implies logged in user context)
    // Based on user request "Current pharmacy", we filter by targetRole =
    // ROLE_PHARMACY or equivalent logic if UserType exists.
    // The entity has `userId` and `userType`.

    @Query("SELECT n FROM Notification n WHERE n.userId = :userId AND n.userType = 'PHARMACY'")
    Page<Notification> findByPharmacyId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.userId = :userId AND n.userType = 'PHARMACY' AND n.read = false AND n.notificationType IN :types")
    long countUnreadByTypes(@Param("userId") Long userId, @Param("types") List<NotificationType> types);
}
