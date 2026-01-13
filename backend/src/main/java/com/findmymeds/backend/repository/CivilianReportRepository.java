package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.CivilianReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CivilianReportRepository extends JpaRepository<CivilianReport, Long> {
}
