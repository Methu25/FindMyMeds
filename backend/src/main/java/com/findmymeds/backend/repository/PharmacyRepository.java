package com.findmymeds.backend.repository;

import com.findmymeds.backend.model.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
    Optional<Pharmacy> findByName(String name);

    List<Pharmacy> findByNameContainingIgnoreCase(String name);

    @Query(value = "SELECT * FROM pharmacies p WHERE " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(p.latitude)) * " +
            "cos(radians(p.longitude) - radians(:lng)) + " +
            "sin(radians(:lat)) * sin(radians(p.latitude)))) < :radius", nativeQuery = true)
    List<Pharmacy> findNearby(@Param("lat") double lat, @Param("lng") double lng, @Param("radius") double radius);
}
