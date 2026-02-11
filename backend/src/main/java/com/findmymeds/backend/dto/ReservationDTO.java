package com.findmymeds.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ReservationDTO {
    private Long id;
    private String reservationCode;
    private String status;
    private String reservationDate;
    private String pickupDate;
    private String timeframe;
    private String civilianName;
    private String civilianLocation;
    private String civilianEmail;
    private String civilianPhone;
    private Integer totalMedicinesCount;
    private Integer totalQuantity;
    private Double totalAmount;
    private String prescriptionImageUrl;
    private String note;
    private CivilianDTO civilian;
    private List<ReservationItemDTO> items;
}
