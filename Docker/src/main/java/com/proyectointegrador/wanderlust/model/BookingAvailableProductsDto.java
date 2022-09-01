package com.proyectointegrador.wanderlust.model;

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
public class BookingAvailableProductsDto {
    @Id
    private Long id;

    @Column(name = "producto")
    private Long id_producto;

    @Column(name = "name")
    private String name;

    @Column(name = "description_title")
    private String description_title;

    @Column(name = "description")
    private String description;

    @Column(name = "direction")
    private String direction;

    @Column(name = "location")
    private String location;

    @Column(name = "map")
    private String map;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "city_id")
    private Long city_id;

    @Column(name = "rate")
    private Double rate;
}
