package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.CivilianHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CivilianHistoryRepository extends JpaRepository<CivilianHistory, Long> {
    List<CivilianHistory> findByCivilianIdOrderByTimestampDesc(Long civilianId);
}
