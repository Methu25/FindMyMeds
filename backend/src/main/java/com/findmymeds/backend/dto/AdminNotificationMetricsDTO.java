package com.findmymeds.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminNotificationMetricsDTO {
    private long readNotifications;
    private long unreadNotifications;
}
