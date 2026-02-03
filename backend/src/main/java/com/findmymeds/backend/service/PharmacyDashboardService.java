package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.DashboardMetricsDto;
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

        public DashboardMetricsDto getMetrics(Long pharmacyId) {

                LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);

                LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

                long todayReservations = reservationRepository.countByPharmacyIdAndDateBetween(
                                pharmacyId,
                                startOfDay,
                                endOfDay);

                long pendingOrders = reservationRepository.countByPharmacyIdAndStatus(
                                pharmacyId,
                                ReservationStatus.PENDING);

                long outOfStock = inventoryRepository.countOutOfStock(pharmacyId);

                long expiringSoon = 0; // placeholder for future logic

                // Providing 0 or dummy for missing fields to match the 7-arg constructor of
                // DashboardMetricsDTO
                return new DashboardMetricsDto(
                                todayReservations,
                                0, // completedToday
                                0, // rejectedToday
                                0, // inStockMedicines
                                pendingOrders,
                                outOfStock,
                                expiringSoon);
        }
}
