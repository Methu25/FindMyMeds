package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.CivilianAppeal;
import com.findmymeds.backend.model.enums.AppealStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface CivilianAppealRepository extends JpaRepository<CivilianAppeal, Long> {

    long countByStatus(AppealStatus status);

    long countByCivilianId(Long civilianId);

    boolean existsByCivilianIdAndAppealNumber(Long civilianId, Integer appealNumber);

    boolean existsByCivilianIdAndStatus(Long civilianId, AppealStatus status);

    Optional<CivilianAppeal> findTopByCivilianIdOrderByCreatedAtDesc(Long civilianId);


}
