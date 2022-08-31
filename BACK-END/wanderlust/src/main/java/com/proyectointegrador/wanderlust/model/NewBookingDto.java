package com.proyectointegrador.wanderlust.model;

import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.persistence.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class NewBookingDto {

    private Long id;
    private String startTime;
    private LocalDate startDate;
    private LocalDate endingDate;
    private Product product;
    private User user;

}
