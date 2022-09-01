package com.proyectointegrador.wanderlust.persistence.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.URL;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Entity
@ToString
@Table( name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;


    @Column(nullable = false, length = 500)
    @NotBlank(message = "El campo no puede quedar vacío")
    //@URL(message = "El formato de los datos debe corresponder al de una URL")
    private String url;

    public Image() {
    }

}
