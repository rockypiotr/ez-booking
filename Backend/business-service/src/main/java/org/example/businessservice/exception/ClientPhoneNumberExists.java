package org.example.businessservice.exception;

public class ClientPhoneNumberExists extends RuntimeException {
    public ClientPhoneNumberExists(String message) {
        super(message);
    }
}
