package com.proyectointegrador.wanderlust.model;

import com.proyectointegrador.wanderlust.persistence.entities.*;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductDto {

    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String descriptionTitle;
    @NotBlank
    private String description;
    @NotBlank
    private String direction;
    @NotBlank
    private String location;
    private String map;
    private Category category;
    private City city;
    private Integer capacity;
    private Long createdBy;
    private List<Feature> features = new ArrayList<>();
    //Agrego atributo users:
    //private List<User> users = new ArrayList<>();
    private List<ImageDto> images = new ArrayList<>();
    private List<RateDto> rates = new ArrayList<>();
    private Politics politics;

    public ProductDto(){

    }

}
