package org.example.service;

import org.example.model.dto.ProviderRegistrationRequest;
import org.example.model.dto.ProviderResponse;
import org.example.model.entity.ProviderProfile;
import org.example.repository.ProviderRepository;
import org.springframework.stereotype.Service;

@Service
public class ProviderService {
    private final ProviderRepository providerRepository;

    public ProviderService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    public ProviderResponse registerProvider(ProviderRegistrationRequest request) {
        if (request.services() == null || request.services().isEmpty()) {
            throw new IllegalArgumentException("At least one service must be provided.");
        }

        ProviderProfile profile = new ProviderProfile();
        profile.setUserId(request.userId());
        profile.setCompanyName(request.companyName());
        profile.setWebsiteUrl(request.websiteUrl());
        profile.setServices(request.services());

        ProviderProfile savedProfile = providerRepository.save(profile);

        return new ProviderResponse(savedProfile.getId(), savedProfile.getUserId(),
                savedProfile.getCompanyName(), savedProfile.getWebsiteUrl(),
                savedProfile.getServices());
    }
}
