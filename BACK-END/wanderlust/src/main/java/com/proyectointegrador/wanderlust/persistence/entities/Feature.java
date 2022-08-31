package com.proyectointegrador.wanderlust.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@ToString
@Table( name = "features")
public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, insertable = false, length = 50)
    private String name;
    @Column(nullable = false, insertable = false, length = 50)
    private String icon;

    @JsonIgnore
    @ManyToMany(mappedBy = "features")
    Set<Product> products = new HashSet<>();

    public Feature() {
    }

}
