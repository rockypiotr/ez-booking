package org.example.businessservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.businessservice.model.dto.ClientCreateRequest;
import org.example.businessservice.model.entity.Client;
import org.example.businessservice.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final BusinessService businessService;

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client getClientById(UUID id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public Client saveClient(ClientCreateRequest clientCreateRequest) {
        return clientRepository.save(createClientFromRequest(clientCreateRequest));
    }

    private Client createClientFromRequest(ClientCreateRequest clientCreateRequest) {
        return Client.builder()
                .name(clientCreateRequest.getName())
                .phoneNumber(clientCreateRequest.getPhone())
                .business(businessService.getBusinessById(clientCreateRequest.getBusinessId()))
                .createdAt(LocalDateTime.now())
                .build();
    }
}
