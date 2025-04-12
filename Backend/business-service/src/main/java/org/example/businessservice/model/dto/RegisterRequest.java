package org.example.businessservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private UUID ownerId;
    private String name;
    private String websiteUrl;
    private Boolean active;
    private List<String> services;
}
