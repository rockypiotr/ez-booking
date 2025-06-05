package org.example.businessservice.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "business")
public class Business {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID ownerId;

    @Column(nullable = false)
    private String name;

    private String websiteUrl;
    private Boolean active;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL)
    private List<BusinessOffering> offerings = new ArrayList<>();
}
