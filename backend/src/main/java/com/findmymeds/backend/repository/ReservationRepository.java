package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Reservation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.status = :status")
    long countByStatus(@Param("status") String status);

    List<Reservation> findByStatus(String status, Pageable pageable);
}
