package org.example.model.dto;

import java.util.List;

public record ProviderRegistrationRequest(
    Long userId,
    String companyName,
    String websiteUrl,
    List<String> services
) {}
