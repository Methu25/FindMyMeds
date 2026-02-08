package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.AdminAppealDetailsDTO;
import com.findmymeds.backend.dto.AdminAppealHistoryItemDTO;
import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.model.CivilianAppeal;
import com.findmymeds.backend.repository.CivilianAppealRepository;
import com.findmymeds.backend.repository.CivilianHistoryRepository;
import com.findmymeds.backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CivilianAppealQueryService {

        private final CivilianAppealRepository appealRepository;
        private final CivilianHistoryRepository historyRepository;
        private final ReservationRepository reservationRepository;

        @Transactional(readOnly = true)
        public AdminAppealDetailsDTO getAppealDetails(Long appealId) {
                if (appealId == null) {
                        throw new IllegalArgumentException("Appeal ID cannot be null");
                }
                CivilianAppeal appeal = appealRepository.findById(appealId)
                                .orElseThrow(() -> new IllegalArgumentException("Appeal not found: " + appealId));

                Civilian c = appeal.getCivilian();

                int appealCount = c.getAppealCount() == null ? 0 : c.getAppealCount();
                int remaining = Math.max(0, CivilianRules.MAX_APPEALS - appealCount);

                List<AdminAppealHistoryItemDTO> history = historyRepository
                                .findTop10ByCivilianIdOrderByTimestampDesc(c.getId())
                                .stream()
                                .map(h -> AdminAppealHistoryItemDTO.builder()
                                                .actionType(h.getActionType())
                                                .actionBy(h.getActionBy())
                                                .reason(h.getReason())
                                                .timestamp(h.getTimestamp())
                                                .build())
                                .toList();

                return AdminAppealDetailsDTO.builder()
                                .appealId(appeal.getId())
                                .banType(appeal.getBanType())
                                .appealNumber(appeal.getAppealNumber())
                                .appealReason(appeal.getAppealReason())
                                .attachment(appeal.getAttachment())
                                .status(appeal.getStatus())
                                .createdAt(appeal.getCreatedAt())
                                .resolvedAt(appeal.getResolvedAt())

                                .civilianId(c.getId())
                                .civilianName(c.getFullName())
                                .civilianEmail(c.getEmail())
                                .civilianPhone(c.getPhone())
                                .nicNumber(c.getNicNumber())

                                .tempBanCount(c.getTempBanCount())
                                .appealCount(appealCount)
                                .remainingAppeals(remaining)
                                .accountStatus(String.valueOf(c.getAccountStatus()))

                                .totalReservations(reservationRepository.countByCivilianId(c.getId()))
                                .uncollectedOrders(reservationRepository.countByCivilianIdAndStatus(c.getId(),
                                                com.findmymeds.backend.model.enums.ReservationStatus.UNCOLLECTED))

                                .history(history)
                                .build();
        }

        @Transactional(readOnly = true)
        public AdminAppealDetailsDTO getLatestAppeal(Long civilianId) {
                CivilianAppeal appeal = appealRepository.findTopByCivilianIdOrderByCreatedAtDesc(civilianId)
                                .orElseThrow(() -> new IllegalArgumentException(
                                                "No appeals found for civilian: " + civilianId));
                return getAppealDetails(appeal.getId());
        }

        public long countAppeals() {
                return appealRepository.count();
        }
}
