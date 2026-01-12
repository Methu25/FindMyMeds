package com.findmymeds.backend.job;

import com.findmymeds.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class NotificationCleanupJob {
    private final NotificationRepository repository;

    @Scheduled(cron = "0 0 2 * * ?") // Daily at 2 AM
    @Transactional
    public void cleanOldReadNotifications() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(7);
        repository.deleteOldReadNotifications(cutoff);
    }
}
