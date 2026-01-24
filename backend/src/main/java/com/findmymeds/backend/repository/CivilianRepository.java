package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Civilian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CivilianRepository extends JpaRepository<Civilian, Long> {
}
