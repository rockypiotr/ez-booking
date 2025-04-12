package org.example.businessservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.businessservice.model.dto.RegisterRequest;
import org.example.businessservice.model.dto.RegisterResponse;
import org.example.businessservice.service.BusinessService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/business")
@RequiredArgsConstructor
public class BusinessController {
    private final BusinessService businessService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> registerProvider(@RequestBody RegisterRequest request) {
        RegisterResponse response = businessService.addBusiness(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
