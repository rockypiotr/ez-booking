package org.example.businessservice.model.dto;

import lombok.*;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class ClientCreateRequest {
    private UUID businessId;
    private String name;
    private String phoneNumber;
}
