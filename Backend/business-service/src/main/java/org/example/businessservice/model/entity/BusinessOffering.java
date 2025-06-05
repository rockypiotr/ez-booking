package org.example.businessservice.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "business_offering")
public class BusinessOffering {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;

    @ManyToOne
    @JoinColumn(name = "offering_id")
    private Offering offering;

    private Double price;
    private Integer duration; // in minutes
    private Integer preparationTime;
    private Integer cleanupTime;
    private Boolean active;
    private Boolean availableForOnlineBooking;
    private Boolean popular;
}
