package org.example.service;

import org.example.dto.LoginRequest;
import org.example.dto.LoginResponse;
import org.example.dto.RegisterRequest;
import org.example.dto.RegisterResponse;
import org.example.exception.InvalidCredentialsException;

public interface UserService {
    LoginResponse login(LoginRequest request) throws InvalidCredentialsException;
    RegisterResponse register(RegisterRequest request);
}
