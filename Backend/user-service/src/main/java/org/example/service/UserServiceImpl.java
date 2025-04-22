package org.example.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.Response;
import org.example.dto.*;
import org.example.entity.User;
import org.example.exception.*;
import org.example.model.Role;
import org.example.repository.UserRepository;
import org.example.security.JwtTokenProvider;
import org.example.util.ValidationUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final WebClient businessServiceClient;

    public LoginResponse login(LoginRequest request) {
        validateLoginRequest(request);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> {
                    log.warn("Login attempt with non-existent username: {}", request.getUsername());
                    throw new InvalidCredentialsException("Invalid username or password");
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Failed login attempt for username: {}", request.getUsername());
            throw new InvalidCredentialsException("Invalid username or password");
        }

        String token = tokenProvider.generateToken(user.getUsername());

        return createAuthenticationTokenResponse(token);
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        validateRegistrationRequest(request);

        userRepository.findByUsername(request.getUsername())
                .ifPresent(user -> {
                    log.warn("Registration attempt with existing username: {}", request.getUsername());
                    throw new UserAlreadyExistsException("User with username " + request.getUsername() + " already exists");
                });

        userRepository.findByEmail(request.getEmail())
                .ifPresent(user -> {
                    log.warn("Registration attempt with existing email: {}", request.getEmail());
                    throw new EmailAlreadyExistsException("User with email " + request.getEmail() + " already exists");
                });

        try {
            User user = createUserFromRequest(request);
            // Password is already encoded in createUserFromRequest
            User savedUser = userRepository.save(user);
            log.info("Created new user: {}", user.getUsername());

            if (Role.BUSINESS.equals(user.getRole())) {
                BusinessDTO businessDTO = createBusinessRegistrationDTO(savedUser, request);
                registerBusinessInExternalService(businessDTO);
            }

            return createUserRegistrationResponse(savedUser);
        } catch (Exception e) {
            log.error("Failed to register user: {}", e.getMessage());
            throw new RegistrationException("Failed to complete registration", e);
        }
    }

    private void registerBusinessInExternalService(BusinessDTO businessDTO) {
        try {
            businessServiceClient.post()
                    .uri("/business/register")
                    .bodyValue(businessDTO)
                    .retrieve()
                    .bodyToMono(Response.class)
                    .block();
            log.info("Successfully created business: {}", businessDTO.getName());
        } catch (WebClientResponseException e) {
            log.error("Failed to create business in business-service: {}", e.getResponseBodyAsString(), e);
            throw new RegistrationException("Failed to create business in business-service: " + e.getMessage(), e.getCause());
        }
    }

    private BusinessDTO createBusinessRegistrationDTO(User savedUser, RegisterRequest request) {
        return BusinessDTO.builder()
                .ownerId(savedUser.getId())
                .name(request.getCompanyName())
                .websiteUrl(request.getWebsiteUrl())
                .services(request.getServices())
                .active(true)
                .build();
    }

    private void validateRegistrationRequest(RegisterRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Registration request cannot be null");
        }

        List<String> validationErrors = new ArrayList<>();

        validateField(validationErrors, request.getUsername(), "Username");

        if (ValidationUtils.isNullOrBlank(request.getEmail())) {
            validationErrors.add("Email cannot be empty");
        } else if (!ValidationUtils.isValidEmail(request.getEmail())) {
            validationErrors.add("Invalid email format");
        }

        if (ValidationUtils.isNullOrBlank(request.getPassword())) {
            validationErrors.add("Password cannot be empty");
        } else if (request.getPassword().length() < 8) {
            validationErrors.add("Password must be at least 8 characters long");
        }

        validateField(validationErrors, request.getPhoneNumber(), "Phone number");

        if (request.getRole() == null) {
            validationErrors.add("Role cannot be empty");
        }

        if (!validationErrors.isEmpty()) {
            throw new ValidationException("Registration validation failed", validationErrors);
        }
    }

    private void validateField(List<String> validationErrors, String fieldValue, String fieldName) {
        if (ValidationUtils.isNullOrBlank(fieldValue)) {
            validationErrors.add(fieldName + " cannot be empty");
        }
    }

    private User createUserFromRequest(RegisterRequest request) {
        return User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(request.getRole())
                .phoneNumber(request.getPhoneNumber())
                .companyName(request.getCompanyName())
                .websiteUrl(request.getWebsiteUrl())
                .createdAt(LocalDateTime.now())
                .build();
    }

    private RegisterResponse createUserRegistrationResponse(User savedUser) {
        return RegisterResponse.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .phone(savedUser.getPhoneNumber()) // Using 'phone' to match RegisterResponse field name
                .createdAt(savedUser.getCreatedAt())
                .build();
    }

    private void validateLoginRequest(LoginRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Login request cannot be null");
        }

        List<String> validationErrors = new ArrayList<>();

        validateField(validationErrors, request.getUsername(), "Username");
        validateField(validationErrors, request.getPassword(), "Password");

        if (!validationErrors.isEmpty()) {
            throw new ValidationException("Login validation failed", validationErrors);
        }
    }

    private LoginResponse createAuthenticationTokenResponse(String token) {
        return LoginResponse.builder()
                .token(token)
                .build();
    }

}
