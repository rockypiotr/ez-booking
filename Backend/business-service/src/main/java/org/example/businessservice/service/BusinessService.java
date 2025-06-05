package org.example.businessservice.service;


import org.example.businessservice.model.dto.RegisterRequest;
import org.example.businessservice.model.dto.RegisterResponse;
import org.example.businessservice.model.entity.Business;

import java.util.UUID;

public interface BusinessService {
    RegisterResponse addBusiness(RegisterRequest request);

    Business getBusinessById(UUID id);
}
