package org.example.businessservice.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.businessservice.service.BusinessService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "offering")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Offering {
    @Id
    @GeneratedValue
    private UUID offeringId;

    private String name;

    @Column(length = 1000)
    private String description;

    private String imageUrl;
    private Integer taxRate;

    @OneToMany(mappedBy = "offering", cascade = CascadeType.ALL)
    private List<BusinessOffering> businessLinks = new ArrayList<>();
}
