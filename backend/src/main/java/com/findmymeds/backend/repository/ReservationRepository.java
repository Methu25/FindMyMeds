package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Reservation;
import com.findmymeds.backend.model.enums.ReservationStatus;
import com.findmymeds.backend.repository.projection.ReservationCountByDate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {

        @Query("""
                            SELECT COUNT(r)
                            FROM Reservation r
                            WHERE r.pharmacy.id = :pharmacyId
                              AND r.reservationDate >= :start
                              AND r.reservationDate < :end
                        """)
        long countByPharmacyIdAndDateBetween(
                        @Param("pharmacyId") Long pharmacyId,
                        @Param("start") LocalDateTime start,
                        @Param("end") LocalDateTime end);

        @Query("""
                            SELECT COUNT(r)
                            FROM Reservation r
                            WHERE r.pharmacy.id = :pharmacyId
                              AND r.status = :status
                        """)
        long countByPharmacyIdAndStatus(
                        @Param("pharmacyId") Long pharmacyId,
                        @Param("status") ReservationStatus status);

  @Query("""
          SELECT function('date', r.reservationDate) AS date, COUNT(r) AS count
          FROM Reservation r
          WHERE r.reservationDate >= :from
          GROUP BY function('date', r.reservationDate)
          ORDER BY function('date', r.reservationDate)
      """)
  List<ReservationCountByDate> countReservationsPerDay(
      @Param("from") LocalDateTime from);
}
