package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.AdminActionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminActionLogRepository extends JpaRepository {

    List findByAdminIdOrderByCreatedAtDesc(Long adminId);

    List findByTargetIdAndTargetTableOrderByCreatedAtDesc(
            Long targetId, String targetTable);
}
