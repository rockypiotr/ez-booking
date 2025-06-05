package org.example.businessservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.businessservice.model.dto.ClientCreateRequest;
import org.example.businessservice.model.entity.Client;
import org.example.businessservice.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/add")
    public ResponseEntity<Client> addClient(@RequestBody ClientCreateRequest clientCreateRequest) {
        return new ResponseEntity<>(clientService.saveClient(clientCreateRequest), HttpStatus.CREATED);
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
