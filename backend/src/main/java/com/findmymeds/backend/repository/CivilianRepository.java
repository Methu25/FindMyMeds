package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Civilian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CivilianRepository extends JpaRepository<Civilian, Long> {
    Optional<Civilian> findByEmail(String email);

    Optional<Civilian> findByNicNumber(String nicNumber);

    long countByAccountStatus(com.findmymeds.backend.model.enums.AccountStatus accountStatus);

    java.util.List<Civilian> findByAccountStatus(com.findmymeds.backend.model.enums.AccountStatus accountStatus);
}
