package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.model.CivilianAppeal;
import com.findmymeds.backend.model.CivilianHistory;

import com.findmymeds.backend.model.enums.AccountStatus;
import com.findmymeds.backend.model.enums.CivilianActionType;
import com.findmymeds.backend.repository.CivilianAppealRepository;
import com.findmymeds.backend.repository.CivilianHistoryRepository;
import com.findmymeds.backend.repository.CivilianRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CivilianManagementService {

    @Autowired
    private CivilianRepository civilianRepository;

    @Autowired
    private CivilianHistoryRepository civilianHistoryRepository;

    @Autowired
    private CivilianAppealRepository civilianAppealRepository;

    public Map<String, Long> getMetrics() {
        Map<String, Long> metrics = new HashMap<>();
        metrics.put("totalCivilians", civilianRepository.count());
        metrics.put("activeCivilians", civilianRepository.countByAccountStatus(AccountStatus.ACTIVE));
        metrics.put("tempBannedCivilians", civilianRepository.countByAccountStatus(AccountStatus.TEMP_BANNED));
        metrics.put("permBannedCivilians", civilianRepository.countByAccountStatus(AccountStatus.PERMANENT_BANNED));
        return metrics;
    }

    public List<Civilian> getCiviliansByStatus(AccountStatus status) {
        return civilianRepository.findByAccountStatus(status);
    }

    public Optional<Civilian> getCivilianById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return civilianRepository.findById(id);
    }

    @Transactional
    public void banCivilianTemporary(Long civilianId, String reason, Long adminId) {
        if (civilianId == null) {
            throw new IllegalArgumentException("Civilian ID cannot be null");
        }
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));

        if (civilian.getTempBanCount() >= 2) {
            throw new RuntimeException("Max temporary bans exceeded. Must be permanently banned.");
        }

        civilian.setAccountStatus(AccountStatus.TEMP_BANNED);
        civilian.setTempBanCount(civilian.getTempBanCount() + 1);
        civilian.setBanDate(LocalDateTime.now());
        civilianRepository.save(civilian);

        logAction(civilian, CivilianActionType.TEMP_BAN, reason, adminId);
        // Notification logic would go here
    }

    @Transactional
    public void banCivilianPermanent(Long civilianId, String reason, Long adminId) {
        if (civilianId == null) {
            throw new IllegalArgumentException("Civilian ID cannot be null");
        }
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));

        civilian.setAccountStatus(AccountStatus.PERMANENT_BANNED);
        civilian.setPermanentBanDate(LocalDateTime.now());
        civilian.setIsLoginDisabled(true);
        civilianRepository.save(civilian);

        logAction(civilian, CivilianActionType.PERM_BAN, reason, adminId);
        // Notification logic would go here
    }

    @Transactional
    public void activateCivilian(Long civilianId, Long adminId) {
        if (civilianId == null) {
            throw new IllegalArgumentException("Civilian ID cannot be null");
        }
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));

        if (!civilian.getAccountStatus().equals(AccountStatus.TEMP_BANNED)) {
            throw new RuntimeException("Only temporarily banned civilians can be activated.");
        }

        // This usually happens after an appeal approval
        civilian.setAccountStatus(AccountStatus.ACTIVE);
        civilianRepository.save(civilian);

        logAction(civilian, CivilianActionType.ACTIVATE, "Account Activated via Admin", adminId);
    }

    @Transactional
    public void maskCivilianData(Long civilianId, Long adminId) {
        if (civilianId == null) {
            throw new IllegalArgumentException("Civilian ID cannot be null");
        }
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));

        if (!civilian.getAccountStatus().equals(AccountStatus.PERMANENT_BANNED)) {
            throw new RuntimeException("Only permanently banned civilians can be masked.");
        }

        civilian.setMaskedEmail("masked_" + civilian.getId() + "@example.com");
        civilian.setMaskedName("Civilian " + civilian.getId());
        civilianRepository.save(civilian);

        logAction(civilian, CivilianActionType.VIEW_VIVO, "Data Masked", adminId);
    }

    public List<CivilianHistory> getCivilianHistory(Long civilianId) {
        if (civilianId == null) {
            throw new IllegalArgumentException("Civilian ID cannot be null");
        }
        return civilianHistoryRepository.findByCivilianIdOrderByTimestampDesc(civilianId);
    }

    @Transactional
    public void processAppeal(Long appealId, boolean approved, String adminReason, Long adminId) {
        if (appealId == null) {
            throw new IllegalArgumentException("Appeal ID cannot be null");
        }
        CivilianAppeal appeal = civilianAppealRepository.findById(appealId)
                .orElseThrow(() -> new RuntimeException("Appeal not found"));

        Civilian civilian = appeal.getCivilian();

        if (approved) {
            appeal.setStatus(com.findmymeds.backend.model.enums.AppealStatus.APPROVED);
            appeal.setResolvedAt(LocalDateTime.now());
            // Activate Logic
            activateCivilian(civilian.getId(), adminId);
            logAction(civilian, CivilianActionType.ACTIVATE, "Appeal Approved: " + adminReason, adminId);
        } else {
            appeal.setStatus(com.findmymeds.backend.model.enums.AppealStatus.REJECTED);
            appeal.setResolvedAt(LocalDateTime.now());
            // Ban Logic
            banCivilianPermanent(civilian.getId(), "Appeal Rejected: " + adminReason, adminId);
            logAction(civilian, CivilianActionType.PERM_BAN, "Appeal Rejected: " + adminReason, adminId);
        }
        civilianAppealRepository.save(appeal);
    }

    private void logAction(Civilian civilian, CivilianActionType actionType, String reason, Long adminId) {
        CivilianHistory history = new CivilianHistory();
        history.setCivilian(civilian);
        history.setActionType(actionType);
        history.setReason(reason);
        history.setActionBy(adminId);
        history.setTimestamp(LocalDateTime.now());
        civilianHistoryRepository.save(history);
    }
}
