package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.CivilianProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CivilianProfileRepository extends JpaRepository<CivilianProfile, Long> {
}
