package com.proyectointegrador.wanderlust.service;


import com.proyectointegrador.wanderlust.persistence.entities.Role;

public interface IRoleService {
    Role findByName(String name);
}
