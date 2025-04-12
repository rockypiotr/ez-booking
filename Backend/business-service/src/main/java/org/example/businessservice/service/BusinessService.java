package org.example.businessservice.service;


import org.example.businessservice.model.dto.RegisterRequest;
import org.example.businessservice.model.dto.RegisterResponse;

public interface BusinessService {
    RegisterResponse addBusiness(RegisterRequest request);
}
