package com.proyectointegrador.wanderlust.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingDto {

    private Long id;
    private String startTime;
    private LocalDate startDate;
    private LocalDate endingDate;
    private Long productId;
    private String productName;

}
