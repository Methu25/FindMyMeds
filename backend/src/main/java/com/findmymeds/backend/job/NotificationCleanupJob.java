package com.findmymeds.backend.job;

import com.findmymeds.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class NotificationCleanupJob {

    private final NotificationRepository notificationRepository;

    @Scheduled(cron = "0 0 2 * * ?") // Runs daily at 2 AM
    public void cleanOldReadNotifications() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(7);
        notificationRepository.deleteOldReadNotifications(cutoff);
        System.out.println("Executed Notification Cleanup Job at " + LocalDateTime.now());
    }
}
