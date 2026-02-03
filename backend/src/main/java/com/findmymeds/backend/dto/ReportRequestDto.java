package com.findmymeds.backend.dto;

import lombok.Data;

@Data
public class ReportRequestDto {
    private String type;
    private String title;
    private String description;
}
