package com.proyectointegrador.wanderlust.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDto {

    private String username;
    private String city;
    private Boolean validate;

    public UserUpdateDto() {
    }

}
