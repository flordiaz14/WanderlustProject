package com.proyectointegrador.wanderlust.model;

import com.proyectointegrador.wanderlust.persistence.entities.Product;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class AuthTokenDto {

    private Long id;
    private String username;
    private String name;
    private String lastname;
    private String token;
    private Boolean validate;
    private Set<Product> favorites;

    public AuthTokenDto(Long id, String username, String name, String lastname, String token, Boolean validate, Set<Product> favorites) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.token = token;
        this.validate = validate;
        this.favorites = favorites;
    }
}