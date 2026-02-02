package com.findmymeds.backend.dto;

import lombok.Data;

@Data
public class ReservationItemDTO {
    private Long id;
    private String name;
    private int quantity;
    // Getters and Setters
}
