package com.proyectointegrador.wanderlust.service.implementation;

import com.proyectointegrador.wanderlust.persistence.entities.Role;
import com.proyectointegrador.wanderlust.persistence.repository.IRoleRepository;
import com.proyectointegrador.wanderlust.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "roleService")
public class RoleService implements IRoleService {

    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public Role findByName(String name) {
        return roleRepository.findRoleByName(name);
    }
}
