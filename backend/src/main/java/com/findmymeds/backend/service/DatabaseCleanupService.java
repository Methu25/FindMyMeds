package com.findmymeds.backend.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DatabaseCleanupService {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * COMPLETELY WIPES DATA to reset IDs.
     * Use with caution.
     */
    @Transactional
    public void hardResetDatabase() {
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0").executeUpdate();

        entityManager.createNativeQuery("TRUNCATE TABLE pharmacy").executeUpdate();
        entityManager.createNativeQuery("TRUNCATE TABLE reservation").executeUpdate();
        entityManager.createNativeQuery("TRUNCATE TABLE pharmacy_inventory").executeUpdate();
        entityManager.createNativeQuery("TRUNCATE TABLE pharmacy_profiles").executeUpdate();
        entityManager.createNativeQuery("TRUNCATE TABLE pharmacy_activity_logs").executeUpdate();
        // Add other tables if needed

        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1").executeUpdate();
        System.out.println("DATABASE RESET COMPLETE: IDs reset to 1.");
    }
}
