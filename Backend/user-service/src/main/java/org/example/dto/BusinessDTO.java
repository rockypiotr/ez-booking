package org.example.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class BusinessDTO {
    private UUID id;
    private UUID ownerId;
    private String name;
    private String websiteUrl;
    private Boolean active;
    private List<String> services;
}
