package com.proyectointegrador.wanderlust.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@ToString
@Table( name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String name;
    @Column(nullable = false, length = 80)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String state;
    @Column(nullable = false, length = 80)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String country;

    @JsonIgnore
    @OneToMany(mappedBy = "city")
    private Set<Product> products = new HashSet<>();

    public City() {
    }

}
