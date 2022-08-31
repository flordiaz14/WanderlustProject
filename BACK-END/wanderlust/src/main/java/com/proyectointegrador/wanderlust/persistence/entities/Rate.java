package com.proyectointegrador.wanderlust.persistence.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "rates")
@Getter @Setter
@ToString
public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El campo no puede quedar vacío")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Double rate;

    public Rate() {
    }
}
