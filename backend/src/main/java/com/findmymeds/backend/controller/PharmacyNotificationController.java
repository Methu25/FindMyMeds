package com.findmymeds.backend.controller;

import com.findmymeds.backend.dto.NotificationCategoryCountDTO;
import com.findmymeds.backend.dto.NotificationDTO;
import com.findmymeds.backend.service.PharmacyNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacy/notifications")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" }, allowCredentials = "true")
public class PharmacyNotificationController {

    @Autowired
    private PharmacyNotificationService notificationService;

    @GetMapping("/categories")
    public ResponseEntity<List<NotificationCategoryCountDTO>> getCategoryCounts() {
        return ResponseEntity.ok(notificationService.getCategoryCounts());
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount() {
        return ResponseEntity.ok(notificationService.getTotalUnreadCount());
    }

    @GetMapping
    public ResponseEntity<Page<NotificationDTO>> getNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(notificationService.getNotifications(page, size));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable @org.springframework.lang.NonNull Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
