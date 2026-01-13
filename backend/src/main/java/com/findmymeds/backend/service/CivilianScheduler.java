package com.findmymeds.backend.service;

import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.model.DeletedCivilian;
import com.findmymeds.backend.model.enums.AccountStatus;
import com.findmymeds.backend.repository.CivilianRepository;
import com.findmymeds.backend.repository.DeletedCivilianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CivilianScheduler {

    @Autowired
    private CivilianRepository civilianRepository;

    @Autowired
    private CivilianManagementService civilianManagementService;

    @Autowired
    private DeletedCivilianRepository deletedCivilianRepository;

    // Run every day at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void cleanupAndEnforceRules() {
        checkAutoPermanentBans();
        checkAutoDeletions();
    }

    private void checkAutoPermanentBans() {
        List<Civilian> tempBanned = civilianRepository.findByAccountStatus(AccountStatus.TEMP_BANNED);
        LocalDateTime fourteenDaysAgo = LocalDateTime.now().minusDays(14);

        for (Civilian civ : tempBanned) {
            if (civ.getBanDate() != null && civ.getBanDate().isBefore(fourteenDaysAgo)) {
                // Auto permanent ban logic - no admin ID (system action = null or 0)
                try {
                    civilianManagementService.banCivilianPermanent(civ.getId(),
                            "Auto-ban: 14 days limit exceeded without approved appeal", null);
                } catch (Exception e) {
                    System.err.println("Failed to auto-ban civilian " + civ.getId() + ": " + e.getMessage());
                }
            }
        }
    }

    private void checkAutoDeletions() {
        List<Civilian> permBanned = civilianRepository.findByAccountStatus(AccountStatus.PERMANENT_BANNED);
        LocalDateTime threeMonthsAgo = LocalDateTime.now().minusMonths(3);

        for (Civilian civ : permBanned) {
            if (civ.getPermanentBanDate() != null && civ.getPermanentBanDate().isBefore(threeMonthsAgo)) {
                try {
                    // Archive
                    DeletedCivilian deleted = new DeletedCivilian();
                    deleted.setOriginalCivilianId(civ.getId());
                    // Mask data if not already masked, though it should be masked on view.
                    // But here we hard mask for archive.
                    deleted.setMaskedName("Deleted User " + civ.getId());
                    deleted.setMaskedEmail("deleted_" + civ.getId() + "@archived");
                    deleted.setMaskedNic("XXXXX");
                    deleted.setHistory_log("Archived automatically after 3 months.");

                    deletedCivilianRepository.save(deleted);
                    civilianRepository.delete(civ);

                } catch (Exception e) {
                    System.err.println("Failed to auto-delete civilian " + civ.getId() + ": " + e.getMessage());
                }
            }
        }
    }
}
