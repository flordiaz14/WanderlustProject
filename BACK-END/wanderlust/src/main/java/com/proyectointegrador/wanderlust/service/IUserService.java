package com.proyectointegrador.wanderlust.service;


import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.model.*;
import com.proyectointegrador.wanderlust.persistence.entities.User;

import java.util.List;

public interface IUserService {
    User save(UserDto user);
    List<User> findAll();
    User findOne(String username);
    User update(UserUpdateDto userDto) throws Exception;
    UserNewDto search(Long id) throws ResourceNotFoundException;
    UserNewDto updateFavorite(UserNewDto userNewDto) throws Exception;
}
