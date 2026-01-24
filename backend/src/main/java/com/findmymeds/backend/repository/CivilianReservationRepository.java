package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CivilianReservationRepository extends JpaRepository<Reservation, String> {
}
