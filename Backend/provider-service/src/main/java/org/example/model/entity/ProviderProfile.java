package org.example.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "provider-profiles")
@Data
public class ProviderProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId; // Foreign key to User
    private String companyName;
    private String websiteUrl;
    @ElementCollection
    private List<String> services; // List of service names
}
