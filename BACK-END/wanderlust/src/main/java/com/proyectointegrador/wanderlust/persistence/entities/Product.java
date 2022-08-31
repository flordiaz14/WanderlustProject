package com.proyectointegrador.wanderlust.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "products")
@Getter @Setter
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String name;

    @Column(name = "description_title",nullable = false, length = 250)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String descriptionTitle;


    @Column(nullable = false, length = 1500)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String description;

    @Column(nullable = false, length = 100)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String direction;

    @Column(nullable = false, length = 100)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String location;

    @Column(length = 500)
    @NotBlank(message = "El campo no puede quedar vacío")
    private String map;

    @Column(nullable = false)
    /*@NotBlank(message = "El campo no puede quedar vacío")*/
    private Integer capacity;

    @Column(nullable = false, name = "created_by")
    private Long createdBy;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Set<Image> images = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Set<Rate> rates = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "features_products",
            joinColumns = @JoinColumn(name = "products_id"),
            inverseJoinColumns = @JoinColumn(name = "features_id"))
    Set<Feature> features = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private Set<Booking> bookings = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "politics_id", referencedColumnName = "id")
    private Politics politics;

    @JsonIgnore
    @ManyToMany(mappedBy = "favorites")
    private Set<User> users = new HashSet<>();

    public Product() {
    }

}
