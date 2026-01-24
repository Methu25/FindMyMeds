package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.SystemSettingsDto;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class PharmacySystemSettingsService {

    // In-memory store for settings since no Settings entity exists
    private final Map<Long, SystemSettingsDto> settingsStore = new ConcurrentHashMap<>();

    public SystemSettingsDto getSettings(Long pharmacyId) {
        return settingsStore.getOrDefault(pharmacyId, new SystemSettingsDto(true, "Light", "Dashboard", true, true));
    }

    public void saveSettings(Long pharmacyId, SystemSettingsDto settings) {
        settingsStore.put(pharmacyId, settings);
        // In real app, save to Pharmacy entity (e.g. JSON column) or separate table
    }
}
