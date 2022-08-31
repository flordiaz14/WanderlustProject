package com.proyectointegrador.wanderlust.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class CityDto {

    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String state;
    @NotBlank
    private String country;

}
