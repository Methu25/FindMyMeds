package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.CivilianNotification;
import com.findmymeds.backend.model.enums.CivilianNotificationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CivilianNotificationRepo
        extends JpaRepository<CivilianNotification, Integer> {

    List<CivilianNotification> findByUserIdOrderByCreatedAtDesc(Integer userId);

    List<CivilianNotification> findByUserIdAndType(
            Integer userId,
            CivilianNotificationType type
    );

    List<CivilianNotification> findByUserIdAndIsRead(
            Integer userId,
            Boolean isRead
    );


}
