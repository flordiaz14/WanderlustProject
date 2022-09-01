package com.proyectointegrador.wanderlust.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class FeatureDto implements Serializable {

    private Long id;
    private String name;
    private String icon;

    public FeatureDto(Long id, String name, String icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }
}
