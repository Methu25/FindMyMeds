package com.findmymeds.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AdminChartTimePointDTO {
    private LocalDate date;
    private long count;
}
