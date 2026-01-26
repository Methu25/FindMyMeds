package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.CivilianNotification;
import com.findmymeds.backend.service.CivilianNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/civilian/notifications")
@CrossOrigin
public class CivilianNotificationController {

    @Autowired
    private CivilianNotificationService service;

    // TEMP until login is added
    private static final Integer LOGGED_CIVILIAN_ID = 1;

    @GetMapping
    public List<CivilianNotification> getAll() {
        return service.getAllNotifications(Long.valueOf(LOGGED_CIVILIAN_ID));
    }

    @GetMapping("/{id}")
    public CivilianNotification getOne(@PathVariable Integer id) {
        return service.getNotificationById(Long.valueOf(id), LOGGED_CIVILIAN_ID);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Integer id) {
        service.markAsRead(id, LOGGED_CIVILIAN_ID);
    }
}

