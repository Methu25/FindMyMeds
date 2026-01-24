package com.findmymeds.backend.dto;

import com.findmymeds.backend.model.enums.NotificationType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long id;
    private NotificationType type;
    private String title;
    private String message;
    private boolean read;
    private LocalDateTime createdAt;
    private Long relatedEntityId;
}
