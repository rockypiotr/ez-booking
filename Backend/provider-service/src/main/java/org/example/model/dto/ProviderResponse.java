package org.example.model.dto;

import java.util.List;

public record ProviderResponse(
        Long id,
        Long userId,
        String companyName,
        String websiteUrl,
        List<String> services
) {
}
