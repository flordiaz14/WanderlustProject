package com.proyectointegrador.wanderlust.model;

import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.persistence.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class UserDto {

    private Long id;
    private String username;
    private String name;
    private String lastname;
    private String password;


    public User getUserFromDto(){
        User user = new User();
        user.setUsername(username);
        user.setName(name);
        user.setLastname(lastname);
        user.setPassword(password);
        
        return user;
    }

}