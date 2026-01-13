package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.RuleRegulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RuleRegulationRepository extends JpaRepository<RuleRegulation, Long> {
}
