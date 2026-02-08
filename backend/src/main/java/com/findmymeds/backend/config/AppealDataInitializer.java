package com.findmymeds.backend.config;

import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.model.CivilianAppeal;
import com.findmymeds.backend.model.enums.AccountStatus;
import com.findmymeds.backend.model.enums.AppealStatus;
import com.findmymeds.backend.model.enums.BanType;
import com.findmymeds.backend.repository.CivilianAppealRepository;
import com.findmymeds.backend.repository.CivilianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AppealDataInitializer {

    private final CivilianRepository civilianRepository;
    private final CivilianAppealRepository appealRepository;

    @Bean
    public CommandLineRunner initAppealData() {
        return args -> {
            // Find all civilians with TEMP_BANNED status
            List<Civilian> tempBannedCivilians = civilianRepository.findByAccountStatus(AccountStatus.TEMP_BANNED);

            if (tempBannedCivilians.isEmpty()) {
                System.out.println("No temporarily banned civilians found. Skipping appeal seeding.");
                return;
            }

            for (Civilian civilian : tempBannedCivilians) {
                // Check if an appeal already exists for this civilian
                if (appealRepository.countByCivilianId(civilian.getId()) > 0) {
                    System.out.println("Appeal already exists for civilian ID: " + civilian.getId());
                    continue;
                }

                // Create a sample appeal
                CivilianAppeal appeal = new CivilianAppeal();
                appeal.setCivilian(civilian);
                appeal.setBanType(BanType.TEMPORARY);
                appeal.setAppealNumber(1);
                appeal.setAppealReason("I was not aware of the rules. Please revoke the ban.");
                appeal.setStatus(AppealStatus.PENDING);
                appeal.setCreatedAt(LocalDateTime.now().minusDays(1)); // Submitted 1 day ago

                appealRepository.save(appeal);
                System.out.println("Seeded appeal for civilian ID: " + civilian.getId());
            }
        };
    }
}
