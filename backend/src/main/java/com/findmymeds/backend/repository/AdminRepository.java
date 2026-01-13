package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Admin;
import com.findmymeds.backend.model.enums.AdminStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);

    long countByStatus(AdminStatus status);
}
