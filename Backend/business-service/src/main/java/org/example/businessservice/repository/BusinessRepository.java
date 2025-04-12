package org.example.businessservice.repository;

import org.example.businessservice.model.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findByOwnerId(UUID ownerId);
    Optional<Business> findById(UUID id);
}
