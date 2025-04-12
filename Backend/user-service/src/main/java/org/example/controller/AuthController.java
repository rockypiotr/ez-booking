package org.example.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.dto.*;
import org.example.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final RestTemplate restTemplate;
    private static final String PROVIDER_SERVICE_URL = "http://localhost:8082/provider/register";

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = userService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
//        RegisterResponse user = authService.register(request);
//
//        if (request.getRole() == Role.PROVIDER) {
//            if (request.getCompanyName() == null || request.getCompanyName().isBlank()) {
//                throw new IllegalArgumentException("Company name is required for Provider");
//            }
//
//            if (request.getServices() == null || request.getServices().isEmpty()) {
//                throw new IllegalArgumentException("At least one service is required for Provider");
//            }
//
//            ProviderRegistrationRequest providerRequest = new ProviderRegistrationRequest(user.id(), request.getCompanyName(), request.getWebsiteUrl(), request.getServices());
//
//            try {
//                restTemplate.postForObject(PROVIDER_SERVICE_URL, providerRequest, ProviderResponse.class);
//            } catch (Exception e) {
//                throw new RuntimeException("Failed to register provider profile: " +  e.getMessage());
//            }
//        }
//        return ResponseEntity.ok(user);
    }
}
