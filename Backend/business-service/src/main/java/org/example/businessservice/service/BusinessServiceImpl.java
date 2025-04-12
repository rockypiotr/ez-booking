package org.example.businessservice.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.businessservice.model.dto.RegisterRequest;
import org.example.businessservice.model.dto.RegisterResponse;
import org.example.businessservice.model.entity.Business;
import org.example.businessservice.repository.BusinessRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusinessServiceImpl implements BusinessService {
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(BusinessServiceImpl.class);

    private final BusinessRepository businessRepository;

    @Transactional
    public RegisterResponse addBusiness(RegisterRequest request) {
        validateAddBusinessRequest(request);

        Business business = createBusinessFromRequest(request);
        Business savedBusiness = businessRepository.save(business);
        logger.info("Created new business: {}", savedBusiness.getName());

        return buildRegisterBusinessResponse(savedBusiness);
    }

    public void validateAddBusinessRequest(RegisterRequest request) {
        if (request.getServices() == null || request.getServices().isEmpty()) {
            logger.error("At least one service must be provided.");
            throw new IllegalArgumentException("At least one service must be provided.");
        }

        if (request.getName() == null || request.getName().isEmpty()) {
            logger.error("Company name cannot be empty.");
            throw new IllegalArgumentException("Company name cannot be empty.");
        }
    }

    private Business createBusinessFromRequest(RegisterRequest request) {
        return Business.builder()
                .ownerId(request.getOwnerId())
                .name(request.getName())
                .websiteUrl(request.getWebsiteUrl())
                .services(request.getServices())
                .active(request.getActive())
                .createdAt(LocalDateTime.now())
                .build();
    }

    private RegisterResponse buildRegisterBusinessResponse(Business savedBusiness) {
        return RegisterResponse.builder()
                .ownerId(savedBusiness.getOwnerId())
                .name(savedBusiness.getName())
                .websiteUrl(savedBusiness.getWebsiteUrl())
                .services(savedBusiness.getServices())
                .createdAt(savedBusiness.getCreatedAt())
                .build();
    }
}
