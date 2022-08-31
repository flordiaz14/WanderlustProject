package com.proyectointegrador.wanderlust.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ImageDto {

    private Long id;
    @NotBlank
    private String title;
    @NotBlank
    private String url;

}


