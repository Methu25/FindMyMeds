package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.model.enums.AccountStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CivilianRepository extends JpaRepository<Civilian, Long> {

    long countByAccountStatus(AccountStatus accountStatus);

    List<Civilian> findByAccountStatus(AccountStatus accountStatus);
}
