package com.findmymeds.backend.dto;

import lombok.Data;

@Data
public class PharmacyProfileDto {
    private Long id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Double rating;
    private String licenseDocument;
    private Boolean verified;
    private String logoPath;
}
