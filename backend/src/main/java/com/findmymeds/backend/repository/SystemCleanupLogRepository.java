package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.SystemCleanupLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemCleanupLogRepository extends JpaRepository<SystemCleanupLog, Long> {
}
