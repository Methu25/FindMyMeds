package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Notification;
import com.findmymeds.backend.model.enums.Role;
import com.findmymeds.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {
    private final NotificationService service;

    @GetMapping
    public List<Notification> getNotifications(@RequestParam Role role) {
        return service.getNotifications(role);
    }

    @GetMapping("/{id}")
    public Notification getNotification(@PathVariable Long id) {
        return service.getNotification(id);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        service.markAsRead(id);
    }
}
