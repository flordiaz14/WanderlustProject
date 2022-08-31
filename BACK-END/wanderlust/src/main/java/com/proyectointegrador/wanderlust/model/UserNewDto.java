package com.proyectointegrador.wanderlust.model;

import com.proyectointegrador.wanderlust.persistence.entities.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class UserNewDto {

        private Long id;
        private String username;
        private String name;
        private String lastname;
        private List<ProductDto> favorites;
        private Product product;
}
