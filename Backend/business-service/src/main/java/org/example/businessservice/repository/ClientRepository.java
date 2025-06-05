package org.example.businessservice.repository;

import org.example.businessservice.model.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {
    Optional<Client> findByPhoneNumber(String phoneNumber);
}
