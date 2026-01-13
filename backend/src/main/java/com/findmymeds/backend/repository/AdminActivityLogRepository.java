package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.AdminActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdminActivityLogRepository extends JpaRepository<AdminActivityLog, Long> {
    List<AdminActivityLog> findByAdminIdOrderByTimestampDesc(Long adminId);
}
