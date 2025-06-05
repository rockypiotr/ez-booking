package org.example.businessservice.service;

import org.example.businessservice.model.dto.ClientCreateRequest;
import org.example.businessservice.model.entity.Client;

import java.util.List;
import java.util.UUID;

public interface ClientService {
    public List<Client> getAllClients();

    public Client getClientById(UUID id);

    public Client saveClient(ClientCreateRequest clientCreateRequest);
    
}
