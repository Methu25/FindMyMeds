package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.CivilianAppeal;
import com.findmymeds.backend.model.enums.AppealStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CivilianAppealRepository extends JpaRepository<CivilianAppeal, Long> {

    long countByStatus(AppealStatus status);
}
