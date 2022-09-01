package com.proyectointegrador.wanderlust.model;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class BookingAvailabilityDto {

 @Id
 private Long id;
 @Column(name = "inicio_periodo")
 private LocalDate inicio_periodo;
 @Column(name = "fin_periodo")
 private LocalDate fin_periodo;
 @Column(name = "lugares_disponibles")
 private Integer lugares_disponibles;
}
