package com.proyectointegrador.wanderlust.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class BookingNotAvailabilityDto {
    @Id
    private Long id;
    @Column(name = "inicio_periodo")
    private LocalDate inicio_periodo;
    @Column(name = "fin_periodo")
    private LocalDate fin_periodo;

}
