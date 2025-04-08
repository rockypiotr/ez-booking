package org.example.model.dto;

import lombok.Data;
import org.example.model.Role;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private Role role;
}
