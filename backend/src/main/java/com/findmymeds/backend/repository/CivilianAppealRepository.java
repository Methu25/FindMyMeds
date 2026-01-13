package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.CivilianAppeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CivilianAppealRepository extends JpaRepository<CivilianAppeal, Long> {
    java.util.List<CivilianAppeal> findByCivilianId(Long civilianId);
}
