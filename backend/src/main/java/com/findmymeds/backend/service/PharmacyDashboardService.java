package com.findmymeds.backend.service;

import com.findmymeds.backend.dto.DashboardMetricsDto;
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

        long todaysReservations = reservationRepository.countByPharmacyIdAndDateBetween(pharmacyId, startOfDay,
                endOfDay);
        long pendingOrders = reservationRepository.countPending(pharmacyId);
        long outOfStock = inventoryRepository.countOutOfStock(pharmacyId);
        long expiringSoon = 0; // inventoryRepository.countExpiringSoon(pharmacyId); -- Assuming 0 as no expiry
                               // column in entity

        return new DashboardMetricsDto(todaysReservations, pendingOrders, outOfStock, expiringSoon);
    }
}
