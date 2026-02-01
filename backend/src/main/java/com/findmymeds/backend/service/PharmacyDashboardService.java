package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.DashboardMetricsDTO;
import com.findmymeds.backend.model.enums.ReservationStatus;
import com.findmymeds.backend.repository.InventoryRepository;
import com.findmymeds.backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class PharmacyDashboardService {

        private final ReservationRepository reservationRepository;
        private final InventoryRepository inventoryRepository;

        public DashboardMetricsDTO getMetrics(Long pharmacyId) {
                LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
                LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

                long todaysReservations = reservationRepository.countByPharmacyIdAndDateBetween(pharmacyId, startOfDay,
                                endOfDay);
                long completedToday = reservationRepository.countByPharmacyIdAndStatusAndDateBetween(
                                pharmacyId, ReservationStatus.COLLECTED, startOfDay,
                                endOfDay);
                long rejectedToday = reservationRepository.countByPharmacyIdAndStatusAndDateBetween(
                                pharmacyId, ReservationStatus.CANCELLED, startOfDay,
                                endOfDay);
                long inStockMedicines = inventoryRepository.countInStock(pharmacyId);

                long pendingOrders = reservationRepository.countByPharmacyIdAndStatus(pharmacyId,
                                ReservationStatus.PENDING);
                long outOfStock = inventoryRepository.countOutOfStock(pharmacyId);
                long expiringSoon = 0; // Placeholder as requested in master branch snippet

                return new DashboardMetricsDTO(
                                todaysReservations,
                                completedToday,
                                rejectedToday,
                                inStockMedicines,
                                pendingOrders,
                                outOfStock,
                                expiringSoon);
        }
}
