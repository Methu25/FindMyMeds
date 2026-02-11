package com.findmymeds.backend.dto;

import lombok.Data;

@Data
public class ReservationItemDTO {
    private Long id;
    private String medicineName;
    private int quantity;
    private Double price;
    private Double subtotal;
}
