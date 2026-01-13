package com.findmymeds.backend.service;

import com.findmymeds.backend.model.*;
import com.findmymeds.backend.model.enums.*;
import com.findmymeds.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CivilianService {

    @Autowired
    private CivilianRepository civilianRepository;

    @Autowired
    private CivilianProfileRepository civilianProfileRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationItemRepository reservationItemRepository;

    @Autowired
    private CivilianReportRepository civilianReportRepository;

    @Autowired
    private CivilianAppealRepository civilianAppealRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Civilian registerCivilian(Civilian civilian) {
        civilian.setPasswordHash(passwordEncoder.encode(civilian.getPasswordHash()));
        civilian.setAccountStatus(AccountStatus.ACTIVE);
        return civilianRepository.save(civilian);
    }

    public Optional<Civilian> findByEmail(String email) {
        return civilianRepository.findByEmail(email);
    }

    public CivilianProfile createOrUpdateProfile(CivilianProfile profile, long civilianId) {
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));
        profile.setCivilian(civilian);
        // Logic to check if profile exists update, otherwise create.
        // For simplicity, assuming new or handled by controller to set ID if update.
        return civilianProfileRepository.save(profile);
    }

    public Reservation createReservation(Reservation reservation, long civilianId, List<ReservationItem> items) {
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));

        if (civilian.getAccountStatus() != AccountStatus.ACTIVE) {
            throw new RuntimeException("Account is restricted. Cannot make reservations.");
        }

        reservation.setCivilian(civilian);
        reservation.setStatus(ReservationStatus.PENDING);
        // Generate code
        reservation.setReservationCode("RES-" + System.currentTimeMillis());
        Reservation savedReservation = reservationRepository.save(reservation);

        for (ReservationItem item : items) {
            item.setReservation(savedReservation);
            reservationItemRepository.save(item);
        }
        return savedReservation;
    }

    public List<Reservation> getReservationHistory(long civilianId) {
        // This is inefficient, should be in repo
        return reservationRepository.findAll().stream()
                .filter(r -> r.getCivilian().getId().equals(civilianId))
                .toList();
    }

    public CivilianReport createReport(CivilianReport report, long civilianId) {
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));
        report.setCivilian(civilian);
        report.setStatus(ReportStatus.PENDING);
        return civilianReportRepository.save(report);
    }

    public CivilianAppeal createAppeal(CivilianAppeal appeal, long civilianId) {
        Civilian civilian = civilianRepository.findById(civilianId)
                .orElseThrow(() -> new RuntimeException("Civilian not found"));

        if (civilian.getAppealCount() >= 2) {
            throw new RuntimeException("Maximum number of appeals reached.");
        }
        if (civilian.getAccountStatus() == AccountStatus.PERMANENT_BANNED) {
            throw new RuntimeException("Permanently banned accounts cannot appeal.");
        }

        civilian.setAppealCount(civilian.getAppealCount() + 1);
        civilianRepository.save(civilian);

        appeal.setCivilian(civilian);
        appeal.setAppealNumber(civilian.getAppealCount()); // Set appeal number logic
        appeal.setStatus(AppealStatus.PENDING);
        return civilianAppealRepository.save(appeal);
    }
}
