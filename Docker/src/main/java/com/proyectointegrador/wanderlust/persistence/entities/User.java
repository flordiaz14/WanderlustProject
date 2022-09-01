package com.proyectointegrador.wanderlust.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="users")
@Getter
@Setter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Email
    @Column(name = "email")
    @NotBlank(message = "El campo no puede quedar vacío")
    private String username;

    @NotBlank
    @Column
    @NotBlank(message = "El campo no puede quedar vacío")
    private String name;

    @NotBlank
    @Column(name = "surname")
    @NotBlank(message = "El campo no puede quedar vacío")
    private String lastname;

    @Column
    @JsonIgnore
    private String password;

    @Column
    private String city;

    @Column
    private Boolean validate = false;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role roles;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Booking> bookings = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "favorites",
            joinColumns = @JoinColumn(name = "users_id" ),
            inverseJoinColumns = @JoinColumn(name = "products_id"))
    private Set<Product> favorites = new HashSet<>();

    public User() {
    }

}