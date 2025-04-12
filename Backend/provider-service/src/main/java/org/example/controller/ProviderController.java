package org.example.controller;

import org.example.model.dto.ProviderRegistrationRequest;
import org.example.model.dto.ProviderResponse;
import org.example.service.ProviderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/provider")
public class ProviderController {
    private final ProviderService providerService;


    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @PostMapping("/register")
    public ResponseEntity<ProviderResponse> registerProvider(@RequestBody ProviderRegistrationRequest request) {
        ProviderResponse provider = providerService.registerProvider(request);

        return ResponseEntity.ok(provider);
    }
}
