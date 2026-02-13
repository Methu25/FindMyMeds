package com.findmymeds.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "password";
        String targetHash = "$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG";

        boolean matches = encoder.matches(rawPassword, targetHash);
        System.out.println("Hash matches 'password': " + matches);

        // Generate a new one just in case
        System.out.println("New Hash for 'password': " + encoder.encode(rawPassword));
    }
}
