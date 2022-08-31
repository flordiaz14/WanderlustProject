package com.proyectointegrador.wanderlust.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;


@Getter
public class CategoryDto implements Serializable {

    private Long id;
    @NotBlank(message = "El campo title no puede quedar vacío")
    private String title;
    @NotBlank(message = "El campo description no puede quedar vacío")
    private String description;
    @NotBlank(message = "El campo url_image no puede quedar vacío")
    private String url_image;

    public CategoryDto() {
    }

    public CategoryDto(Long id, String title, String description, String url_image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url_image = url_image;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public void setUrl_image(String url_image) {
        this.url_image = url_image;
    }
}
