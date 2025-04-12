package org.example.service;

import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final WebClient businessServiceClient;

    public LoginResponse login(LoginRequest request) {
        validateLoginRequest(request);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> {
                    logger.warn("Login attempt with non-existent username: {}", request.getUsername());
                    throw new InvalidCredentialsException("Invalid username or password");
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            logger.warn("Failed login attempt for username: {}", request.getUsername());
            throw new InvalidCredentialsException("Invalid username or password");
        }

        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getUsername());

        return buildLoginResponse(token);
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        validateRegistrationRequest(request);

        userRepository.findByUsername(request.getUsername())
                .ifPresent(user -> {
                    logger.warn("Registration attempt with existing username: {}", request.getUsername());
                    throw new UserAlreadyExistsException("User with username " + request.getUsername() + " already exists");
                });

        userRepository.findByEmail(request.getEmail())
                .ifPresent(user -> {
                    logger.warn("Registration attempt with existing email: {}", request.getEmail());
                    throw new EmailAlreadyExistsException("User with email " + request.getEmail() + " already exists");
                });

        try {
            User user = createUserFromRequest(request);
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            User savedUser = userRepository.save(user);
            logger.info("Created new user: {}", user);

            if (Role.BUSINESS.equals(user.getRole())) {
                BusinessDTO businessDTO = createBusinessDTOFromUser(savedUser, request);
                callBusinessServiceToAddBusiness(businessDTO);
            }

            return buildRegisterResponse(savedUser);
        } catch (Exception e) {
            logger.error("Failed to register user: {}", e.getMessage());
            throw new RegistrationException("Failed to complete registration", e);
        }
    }

    private void callBusinessServiceToAddBusiness(BusinessDTO businessDTO) {
        try {
            businessServiceClient.post()
                    .uri("/business/register")
                    .bodyValue(businessDTO)
                    .retrieve()
                    .bodyToMono(Void.class)
                    .block();
            logger.info("Successfully created business : {}", businessDTO.getName());
        } catch (WebClientResponseException e) {
            logger.error("Failed to create business in business-service: {}", e.getResponseBodyAsString(), e);
            throw new RegistrationException("Failed to create business in business-service: " + e.getMessage(), e.getCause());
        }
    }

    private BusinessDTO createBusinessDTOFromUser(User savedUser, RegisterRequest request) {
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

        if (ValidationUtils.isNullOrBlank(request.getUsername())) {
            validationErrors.add("Username cannot be empty");
        }

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

        if (!validationErrors.isEmpty()) {
            throw new ValidationException("Registration validation failed", validationErrors);
        }
    }

    private User createUserFromRequest(RegisterRequest request) {
        return User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(request.getRole())
                .phoneNumber(request.getPhone())
                .build();
    }

    private RegisterResponse buildRegisterResponse(User savedUser) {
        return RegisterResponse.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .phone(savedUser.getPhoneNumber())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }

    private void validateLoginRequest(LoginRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Login request cannot be null");
        }

        List<String> validationErrors = new ArrayList<>();

        if (StringUtils.isBlank(request.getUsername())) {
            validationErrors.add("Username cannot be empty");
        }

        if (StringUtils.isBlank(request.getPassword())) {
            validationErrors.add("Password cannot be empty");
        }

        if (!validationErrors.isEmpty()) {
            throw new ValidationException("Login validation failed", validationErrors);
        }
    }

    private LoginResponse buildLoginResponse(String token) {
        return LoginResponse.builder()
                .token(token)
                .build();
    }

}
