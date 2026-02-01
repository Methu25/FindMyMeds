package com.findmymeds.backend.repository.projection;

public interface ReservationCountByDate {
    String getDate();

    long getCount();
}
